package com.example.coffee.controllers;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.coffee.form.ScollectionForm;
import com.example.coffee.pojo.Scollection;
import com.example.coffee.pojo.Shop;
import com.example.coffee.service.IScollectionService;
import com.example.coffee.service.IShopService;
import com.example.coffee.vo.ShopResult;
import com.example.coffee.vo.ShopVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@Slf4j
@RequestMapping("/coffee-shop")
public class ShopController {

    @Autowired
    private IShopService shopService;  //ioc反向控制

    @Autowired
    private IScollectionService scollectionService;

    @GetMapping("/shoplist")   //分页功能（包括是否按评分rating降序显示、分类）
    public ShopResult shoplist(@RequestParam(defaultValue = "1") int pageNum, @RequestParam(defaultValue = "30")int pageSize,
                               String district, String tag, @RequestParam(defaultValue = "false") boolean sort,
                               HttpServletResponse response) {

        log.info("shop list, pageNum={}, pageSize={}, district={}, tag={}, sort={}", pageNum, pageSize, district, tag, sort);

        response.setHeader("Access-Control-Allow-Origin","*");
        Page<Shop> page = new Page<>(pageNum, pageSize);
        if (sort || !Objects.equals(district, "") || !Objects.equals(tag, "")){
            //需要先查询符合条件的所有记录
            QueryWrapper<Shop> query = new QueryWrapper<Shop>();
            List<Shop> shopList;
            log.info("1");

            if (sort){

                query.orderByDesc("rating");
                shopList = shopService.list(query);
                log.info("11");

                if (!Objects.equals(district, "")){
                    shopList.removeIf(shop -> !Objects.equals(shop.getDistrict(), district));
                    log.info("111");
                }

                if (!Objects.equals(tag, "")){
                    shopList.removeIf(shop -> !Objects.equals(shop.getTag(), tag));
                    log.info("112");
                }

                log.info("shops={}", shopList);

            }else {

                log.info("12");
                if (!Objects.equals(district, "")){

                    log.info("121");
                    if (!Objects.equals(tag, "")){
                        query.eq("district", district).equals(query.eq("tag", tag));
                    }else {
                        query.eq("district", district);
                    }

                }else {
                    query.eq("tag", tag);
                    log.info("122");
                }
                shopList = shopService.list(query);

            }

            //然后根据pageNum、pageSize，通过sql语句进行分页
            /*List<ShopVo> shopVoList = shopService.selectShopBySql(pageNum, pageSize, shopList);
            if (shopVoList == null){
                throw new RuntimeException("shopVoList = null");
            }else {
                return ShopResult.success(shopVoList);
            }*/

            //太麻烦了，还是直接用page分页
            int count = shopList.size();
            List shopVoList = new ArrayList<>();
            int currentId = pageNum > 1 ? (pageNum - 1) * pageSize : 0;
            for (int i = 0; i < pageSize && i < count - currentId; i++) {
                ShopVo shopVo = new ShopVo();
                BeanUtils.copyProperties(shopList.get(currentId + i), shopVo);
                shopVoList.add(shopVo);
            }
            page.setSize(pageSize);
            page.setCurrent(pageNum);
            page.setTotal(count);
            page.setPages(count % pageSize == 0 ? count / pageSize : count / pageSize + 1);
            page.setRecords(shopVoList);
            return ShopResult.success(page);

        }else {
            //使用MyBatis-plus
            IPage<Shop> pageResult = shopService.page(page);
            log.info("2");

            //无条件分页
            List shopVoList = pageResult.getRecords().stream().map( shop -> {
                ShopVo shopVo = new ShopVo();
                BeanUtils.copyProperties(shop, shopVo);
                return shopVo;
            }).collect(Collectors.toList());
            pageResult.setRecords(shopVoList);
            return ShopResult.success(pageResult);
        }
    }

    @GetMapping("/searchshop")  //搜索：动态联想与自动补全
    public ShopResult searchshop(@RequestParam String keyword){
        log.info("search, keyword={}", keyword);

        QueryWrapper query = new QueryWrapper<Shop>();
        query.like("name", keyword);
        List<Shop> shopList = shopService.list(query);

        List<ShopVo> shopVoList = new ArrayList<>();
        for (Shop shop : shopList) {
            ShopVo shopVo = new ShopVo();
            BeanUtils.copyProperties(shop, shopVo);
            shopVoList.add(shopVo);
        }

        return ShopResult.success(shopVoList);
    }

    @GetMapping("/shopdetail")  //用户点击shoplist中（或搜索栏中）某一店铺，显示其具体信息
    public ShopResult shopdetail(@RequestParam String name) {
        log.info("shopdetail, shopName={}", name);

        QueryWrapper query = new QueryWrapper<Shop>();
        query.eq("name", name);
        Shop shop = shopService.getOne(query);

        ShopVo shopVo = new ShopVo();
        BeanUtils.copyProperties(shop, shopVo);

        return ShopResult.success(shopVo);
    }

    @PostMapping("/addshop")  //实现收藏功能，给scollections表添加一条记录
    public ShopResult addshop(@RequestBody ScollectionForm scollectionForm){
        log.info("shop add, scollectionForm={}", scollectionForm);  //这里前端sUrl传不过来（？

        //先根据name查询出shopId
        QueryWrapper query = new QueryWrapper<Shop>();
        query.eq("name", scollectionForm.getName());
        int shopId = shopService.getOne(query).getShopId();

        //将前端获取到的userId、sUrl与shopId一起写入scollections表
        Scollection scollection = new Scollection();
        scollection.setShopId(shopId);
        scollection.setUserId(scollectionForm.getUserId());
        scollection.setSUrl("http://coffee.com");  //这里我强行写死了，等解决了前端问题可以去除
        log.info("sUrl={}, scollection={}", scollectionForm.getSUrl(), scollection);

        scollectionService.saveMain(scollection);

        return ShopResult.success();
    }

    @DeleteMapping("/deleteshop")  //取消收藏
    public ShopResult deleteshop(String name, int userId){
        log.info("shop delete, shopName={}, userId={}", name, userId);

        //先根据name查询出shopId
        QueryWrapper query1 = new QueryWrapper<Shop>();
        query1.eq("name", name);
        int shopId = shopService.getOne(query1).getShopId();

        //条件查询并删除记录
        QueryWrapper query2 = new QueryWrapper<Scollection>();
        query2.eq("user_id", userId).equals(query2.eq("shop_id", shopId));
        scollectionService.remove(query2);

        return ShopResult.success();
    }
}
