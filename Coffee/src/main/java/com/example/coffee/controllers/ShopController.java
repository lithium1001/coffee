package com.example.coffee.controllers;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.coffee.pojo.Scollection;
import com.example.coffee.pojo.Shop;
import com.example.coffee.pojo.User;
import com.example.coffee.service.IScollectionService;
import com.example.coffee.service.IShopService;
import com.example.coffee.service.UserService;
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

    @Autowired
    private UserService userService;

    @GetMapping("/shoplist")   //分页功能（包括是否按评分rating降序显示、分类）
    public ShopResult shoplist(@RequestParam(defaultValue = "1") int pageNum, @RequestParam(defaultValue = "30")int pageSize,
                               String district, String tag, @RequestParam(defaultValue = "false") boolean sort,
                               HttpServletResponse response, String username) {

        log.info("shop list, pageNum={}, pageSize={}, district={}, tag={}, sort={}, username={}", pageNum, pageSize, district, tag, sort, username);

        response.setHeader("Access-Control-Allow-Origin","*");
        Page<Shop> page = new Page<>(pageNum, pageSize);
        if (sort || (!Objects.equals(district, "")&&district != null) || (!Objects.equals(tag, "")&&tag != null)){
            //需要先查询符合条件的所有记录
            QueryWrapper<Shop> query = new QueryWrapper<Shop>();
            List<Shop> shopList;
            log.info("1");

            if (sort){

                query.orderByDesc("rating");
                shopList = shopService.list(query);
                log.info("11");

                if (!Objects.equals(district, "") && district != null){
                    shopList.removeIf(shop -> !Objects.equals(shop.getDistrict(), district));
                    log.info("111");
                }

                if (!Objects.equals(tag, "") && tag != null){
                    shopList.removeIf(shop -> !Objects.equals(shop.getTag(), tag));
                    log.info("112");
                }

                log.info("shops={}", shopList);

            }else {

                log.info("12");
                if (!Objects.equals(district, "") && district != null){

                    log.info("121");
                    if (!Objects.equals(tag, "") && tag != null){
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

                if (!Objects.equals(username, "") && username != null){
                    QueryWrapper queryWrapper1 = new QueryWrapper<User>();
                    queryWrapper1.eq("username", username);
                    String userId = userService.getOne(queryWrapper1).getId();

                    QueryWrapper queryWrapper2 = new QueryWrapper<Scollection>();
                    queryWrapper2.eq("user_id", userId).equals(queryWrapper2.eq("shop_id", shopList.get(currentId + i).getShopId()));
                    Scollection scollection = scollectionService.getOne(queryWrapper2);

                    if (scollection != null){
                        shopVo.setCollection(true);
                    }
                }

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

                if (!Objects.equals(username, "") && username != null){
                    QueryWrapper queryWrapper1 = new QueryWrapper<User>();
                    queryWrapper1.eq("username", username);
                    String userId = userService.getOne(queryWrapper1).getId();

                    QueryWrapper queryWrapper2 = new QueryWrapper<Scollection>();
                    queryWrapper2.eq("user_id", userId).equals(queryWrapper2.eq("shop_id", shop.getShopId()));
                    Scollection scollection = scollectionService.getOne(queryWrapper2);

                    if (scollection != null){
                        shopVo.setCollection(true);
                    }
                }

                return shopVo;
            }).collect(Collectors.toList());
            pageResult.setRecords(shopVoList);
            return ShopResult.success(pageResult);
        }
    }

    @GetMapping("/searchshop")  //搜索：动态联想与自动补全
    public ShopResult searchshop(@RequestParam String keyword, String username){
        log.info("search, keyword={}, username={}", keyword, username);

        QueryWrapper query = new QueryWrapper<Shop>();
        query.like("name", keyword);
        List<Shop> shopList = shopService.list(query);

        List<ShopVo> shopVoList = new ArrayList<>();
        for (Shop shop : shopList) {
            ShopVo shopVo = new ShopVo();
            BeanUtils.copyProperties(shop, shopVo);

            if (!Objects.equals(username, "") && username != null){
                QueryWrapper queryWrapper1 = new QueryWrapper<User>();
                queryWrapper1.eq("username", username);
                String userId = userService.getOne(queryWrapper1).getId();

                QueryWrapper queryWrapper2 = new QueryWrapper<Scollection>();
                queryWrapper2.eq("user_id", userId).equals(queryWrapper2.eq("shop_id", shop.getShopId()));
                Scollection scollection = scollectionService.getOne(queryWrapper2);

                if (scollection != null){
                    shopVo.setCollection(true);
                }
            }

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
    public ShopResult addshop(@RequestParam String name, @RequestParam String username){
        log.info("shop add, shopName={}, username={}", name, username);

        //先根据name查询出shopId、根据username查出userId
        QueryWrapper query1 = new QueryWrapper<Shop>();
        query1.eq("name", name);
        int shopId = shopService.getOne(query1).getShopId();
        QueryWrapper query2 = new QueryWrapper<User>();
        query2.eq("username", username);
        String userId = userService.getOne(query2).getId();

        //将userId与shopId一起写入scollections表
        Scollection scollection = new Scollection();
        scollection.setShopId(shopId);
        scollection.setUserId(userId);

        scollectionService.saveMain(scollection);

        return ShopResult.success();
    }

    @DeleteMapping("/deleteshop")  //取消收藏
    public ShopResult deleteshop(@RequestParam String name, @RequestParam String username){
        log.info("shop delete, shopName={}, username={}", name, username);

        //先根据name查询出shopId、根据username查出userId
        QueryWrapper query1 = new QueryWrapper<Shop>();
        query1.eq("name", name);
        int shopId = shopService.getOne(query1).getShopId();
        QueryWrapper query2 = new QueryWrapper<User>();
        query2.eq("username", username);
        String userId = userService.getOne(query2).getId();

        //条件查询并删除记录
        QueryWrapper query3 = new QueryWrapper<Scollection>();
        query3.eq("user_id", userId).equals(query3.eq("shop_id", shopId));
        scollectionService.remove(query3);

        return ShopResult.success();
    }
}
