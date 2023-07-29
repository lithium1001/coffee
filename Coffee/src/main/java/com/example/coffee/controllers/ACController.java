package com.example.coffee.controllers;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.coffee.pojo.ACollection;
import com.example.coffee.pojo.User;
import com.example.coffee.service.IACService;
import com.example.coffee.service.UserService;
import com.example.coffee.vo.ACVo;
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

public class ACController {
    @Autowired
    private IACService acService;
    @Autowired
    private UserService userService;

    @GetMapping("/user/acollection")
    public Result acpage(@RequestParam String uname,@RequestParam(defaultValue="1") int pageNum, @RequestParam(defaultValue="2")int pageSize, @RequestParam(defaultValue = "desc") String order){
        QueryWrapper<User> query1 = new QueryWrapper<>();
        query1.eq("username",uname);
        User user= userService.getOne(query1);
        String uid=user.getId();
        Page<ACollection> page = new Page<>(pageNum,pageSize);
        QueryWrapper<ACollection> query = new QueryWrapper<>();
        query.eq("user_id",uid);
        IPage<ACollection> pageResult=acService.page(page,query);
        List<ACollection> acs=pageResult.getRecords();
        List voList = new ArrayList();
        for(ACollection aCollection :acs){
            ACVo ACVo =new ACVo();
            BeanUtils.copyProperties(aCollection, ACVo);
            voList.add(ACVo);
        }
        pageResult.setRecords(voList);
        return Result.suc(pageResult);
    }
    @PostMapping("/articles/add")
    public Result Aadd(@RequestBody ACollection newac) {
        QueryWrapper<ACollection> query = new QueryWrapper<>();
        query.and(w -> w.eq("user_id", newac.getUserId()))
                .and(w -> w.eq("aid", newac.getAid()));
        ACollection ac = acService.getOne(query);
        if(ac==null){
            acService.save(newac);
            return Result.suc("收藏成功！");
        }
            else{
            return Result.suc("已经收藏过了，无法重新收藏！");
            }
        }
    @DeleteMapping("/articles/delete")
    public Result Adel(@RequestBody ACollection delac) {

        QueryWrapper<ACollection> query = new QueryWrapper<>();
        query.and(w -> w.eq("user_id", delac.getUserId()))
                .and(w -> w.eq("aid", delac.getAid()));
        ACollection ac = acService.getOne(query);

        if(ac==null){
            return Result.suc("删除失败！");
        }
        else{
            acService.remove(query);
            return Result.suc("删除成功");
        }
    }
}
