package com.example.coffee.controllers;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.coffee.pojo.Scollection;
import com.example.coffee.pojo.Shop;
import com.example.coffee.service.IScollectionService;
import com.example.coffee.service.IShopService;
import com.example.coffee.vo.ScollectionVo;
import com.example.coffee.vo.ShopResult;
import com.example.coffee.vo.ShopVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/searchshop")  //搜索：动态联想与自动补全
    public ShopResult searchshop(@RequestParam String keyword) {
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

    @GetMapping("/shoplist")   //分页显示
    public ShopResult shoplist(@RequestParam(defaultValue = "1") int pageNum, @RequestParam(defaultValue = "30") int pageSize,
                               @RequestParam String username, HttpServletResponse response) {
        log.info("shop list, pageNum={}, pageSize={}, username={}", pageNum, pageSize, username);

        response.setHeader("Access-Control-Allow-Origin","*");
        Page<Scollection> page = new Page<>(pageNum, pageSize);

        //先根据username查询对应的userId
        
        IPage<Scollection> pageResult = scollectionService.page(page);

        List scollectionVoList = pageResult.getRecords().stream().map( scollection -> {
            ScollectionVo scollectionVo = new ScollectionVo();
            scollectionVo.setSUrl(scollection.getSUrl());

            QueryWrapper query = new QueryWrapper<Shop>();
            query.eq("shop_id", scollection.getShopId());
            Shop shop = shopService.getOne(query);

            scollectionVo.setName(shop.getName());
            scollectionVo.setPhone(shop.getPhone());
            scollectionVo.setRating(shop.getRating());
            scollectionVo.setPictureUrl(shop.getPictureUrl());

            return scollectionVo;
        }).collect(Collectors.toList());
        pageResult.setRecords(scollectionVoList);

        return ShopResult.success(pageResult);
    }
}
