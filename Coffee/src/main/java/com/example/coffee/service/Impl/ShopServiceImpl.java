package com.example.coffee.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.coffee.mapper.ShopMapper;
import com.example.coffee.pojo.Shop;
import com.example.coffee.service.IShopService;
//import com.example.coffee.vo.ShopVo;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;

@Service
public class ShopServiceImpl extends ServiceImpl<ShopMapper, Shop> implements IShopService {

    //手动分页
    /*@Autowired
    private ShopMapper shopMapper;

    @Override
    public List<ShopVo> selectShopBySql(int pageNum, int pageSize, List<Shop> shopList) {

        Map<String , Object> map = new HashMap<>();

        int current = (pageNum - 1) * pageSize;
        int count = shopList.size();
        int total = count / pageSize;


        if (pageNum > total || pageNum <= 0){
            return null;
        }else {
            map.put("current", current);
            map.put("size", pageSize);
            List<ShopVo> shopVoList = shopMapper.selectBySql(map);
            return shopVoList;
        }
    }*/
}
