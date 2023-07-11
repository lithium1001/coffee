package com.example.coffee.controllers;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.coffee.pojo.KCollection;
import com.example.coffee.pojo.User;
import com.example.coffee.service.IKCService;
import com.example.coffee.vo.KCVo;
import com.example.coffee.vo.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/CoffeeVerse")
public class KCController {
    @Autowired
    private IKCService kcService;
    @GetMapping("/user/kcollection")
    public Result kcpage(@RequestParam int uid,@RequestParam(defaultValue="1") int pageNum, @RequestParam(defaultValue="2")int pageSize, @RequestParam(defaultValue = "id") String refer, @RequestParam(defaultValue = "desc") String order){
        Page<KCollection> page = new Page<>(pageNum,pageSize);
        QueryWrapper<KCollection> query = new QueryWrapper<>();
        query.eq("user_id",uid);
        if (refer.equals("id")) {
            if(order.equals("asc")){
                query.orderByAsc("k_id");}
            else{
                query.orderByDesc("k_id");
            }
        } else if (refer.equals("title")) {
            if(order.equals("asc")){
                query.orderByAsc("title");}
            else{
                query.orderByDesc("title");
            }
        } else if (refer.equals("tag")) {
            if(order.equals("asc")){
                query.orderByAsc("tag");}
            else{
                query.orderByDesc("tag");
            }
        } else if (refer.equals("collections")) {
            if(order.equals("asc")){
                query.orderByAsc("collections");}
            else{
                query.orderByDesc("collections");
            }
        }
        IPage<KCollection> pageResult=kcService.page(page,query);
        List<KCollection> kcs=pageResult.getRecords();
        List voList = new ArrayList();
        for(KCollection kCollection:kcs){
            KCVo kcVo=new KCVo();
            BeanUtils.copyProperties(kCollection,kcVo);
            voList.add(kcVo);
        }
        pageResult.setRecords(voList);
        return Result.suc(pageResult);
    }
    @PostMapping("/knowledge/add")
    public Result Kadd(@RequestBody KCollection newkc) {
        QueryWrapper<KCollection> query = new QueryWrapper<>();
        query.and(w -> w.eq("user_id", newkc.getUserId()))
                .and(w -> w.eq("k_id", newkc.getKId()));
        if(query!=null){
            return Result.suc("已经收藏过了，无法重新收藏！");
        }
            else{kcService.save(newkc);
                return Result.suc("收藏成功！");
            }
        }
    @DeleteMapping("/knowledge/delete")
    public Result Kdel(@RequestBody KCollection delkc) {
        QueryWrapper<KCollection> query = new QueryWrapper<>();
        query.and(w -> w.eq("user_id", delkc.getUserId()))
                .and(w -> w.eq("k_id", delkc.getKId()));
        if(query!=null){
            kcService.remove(query);
            return Result.suc("删除成功");
        }
        else{
            return Result.suc("删除失败！");
        }
    }
}
