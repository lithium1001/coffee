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
import com.example.coffee.vo.ScollectionVo;
import com.example.coffee.vo.ShopResult;
import com.example.coffee.vo.ShopVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@Slf4j
@RequestMapping("/Scollection")
public class ScollectionController {

    @Autowired
    private IScollectionService scollectionService;

    @Autowired
    private IShopService shopService;

    @Autowired
    private UserService userService;

    @GetMapping("/searchshop")  //搜索：动态联想与自动补全
    public ShopResult searchshop(@RequestParam String keyword, @RequestParam String username) {
        log.info("search, keyword={}, username={}", keyword, username);

        QueryWrapper query1 = new QueryWrapper<User>();
        query1.eq("username", username);
        String userId = userService.getOne(query1).getId();

        QueryWrapper query2 = new QueryWrapper<Scollection>();
        query2.like("user_id", userId);
        List<Scollection> scollectionList= scollectionService.list(query2);

        List<Shop> shopList = new ArrayList<>();
        for (Scollection scollection : scollectionList) {
            int shopId = scollection.getShopId();
            QueryWrapper query = new QueryWrapper<Shop>();
            query.eq("shop_id", shopId).equals(query.like("name", keyword));
            Shop shop = shopService.getOne(query);

            if (shop != null){
                shopList.add(shop);
            }
        }

        List<ShopVo> shopVoList = new ArrayList<>();
        for (Shop shop : shopList) {
            ShopVo shopVo = new ShopVo();
            BeanUtils.copyProperties(shop, shopVo);
            shopVoList.add(shopVo);
        }

        return ShopResult.success(shopVoList);
    }

    @GetMapping("/shoplist")   //分页显示
    public ShopResult shoplist(@RequestParam(defaultValue = "1") int pageNum, @RequestParam(defaultValue = "30") int pageSize,
                               @RequestParam String username, HttpServletResponse response) {
        log.info("shop list, pageNum={}, pageSize={}, username={}", pageNum, pageSize, username);

        response.setHeader("Access-Control-Allow-Origin","*");
        Page<Scollection> page = new Page<>(pageNum, pageSize);

        //先根据username查询对应的userId
        QueryWrapper query1 = new QueryWrapper<User>();
        query1.eq("username", username);
        String userId = userService.getOne(query1).getId();

        //再根据userId查出包含的shopId
        QueryWrapper query2 = new QueryWrapper<Scollection>();
        query2.like("user_id", userId);
        List<Scollection> scollectionList= scollectionService.list(query2);

        int count = scollectionList.size();
        List scollectionVoList = new ArrayList<>();
        int currentId = pageNum > 1 ? (pageNum - 1) * pageSize : 0;
        for (int i = 0; i < pageSize && i < count - currentId; i++) {
            ScollectionVo scollectionVo = new ScollectionVo();

            QueryWrapper query = new QueryWrapper<Shop>();
            query.eq("shop_id", scollectionList.get(currentId + i).getShopId());
            Shop shop = shopService.getOne(query);

            scollectionVo.setName(shop.getName());
            scollectionVo.setRating(shop.getRating());
            scollectionVo.setPictureUrl(shop.getPictureUrl());
            scollectionVo.setDistrict(shop.getDistrict());

            scollectionVoList.add(scollectionVo);
        }
        page.setSize(pageSize);
        page.setCurrent(pageNum);
        page.setTotal(count);
        page.setPages(count % pageSize == 0 ? count / pageSize : count / pageSize + 1);
        page.setRecords(scollectionVoList);

        return ShopResult.success(page);
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
