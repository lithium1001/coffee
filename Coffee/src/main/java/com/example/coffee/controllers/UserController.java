package com.example.coffee.controllers;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.coffee.pojo.Knowledge;
import com.example.coffee.pojo.User;
import com.example.coffee.service.IUserService;
import com.example.coffee.vo.KnowledgeDetailVo;
import com.example.coffee.vo.Result;
import com.example.coffee.vo.UserVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/CoffeeVerse")
public class UserController {

    @Autowired
    private IUserService userService;

    @GetMapping("/user/home")
    public Result homepage(@RequestParam String name,@RequestParam String pwd) {
        QueryWrapper<User> detail = new QueryWrapper<>();
        detail.and(w -> w.eq("username", name))
                .and(w -> w.eq("password", pwd));
        User user=userService.getOne(detail);
        if (user==null) {
            return Result.suc("请正确输入用户名或密码!");
        } else {
            UserVo userVo=new UserVo();
            BeanUtils.copyProperties(user,userVo);
            return Result.suc(userVo);
        }
    }

    @PostMapping("/user/login")
    public Result login(@RequestParam String name,@RequestParam String pwd) {
        QueryWrapper<User> detail = new QueryWrapper<>();
        detail.and(w -> w.eq("username", name))
                .and(w -> w.eq("password", pwd));
        User user=userService.getOne(detail);
        if (user==null) {
            return Result.suc("请正确输入用户名或密码!");
        } else {
            UserVo userVo=new UserVo();
            BeanUtils.copyProperties(user,userVo);
            return Result.suc(userVo);
        }
    }
}
