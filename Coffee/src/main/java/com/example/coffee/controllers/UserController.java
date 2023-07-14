package com.example.coffee.controllers;

import com.example.coffee.common.Api.ApiResult;
import com.example.coffee.dto.LoginDTO;
import com.example.coffee.dto.RegisterDTO;
import com.example.coffee.pojo.User;
import com.example.coffee.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

import static com.example.coffee.Jwt.JwtUtil.USER_NAME;

@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {
    @Resource
    private UserService iUmsUserService;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ApiResult<Map<String, Object>> register(@Valid @RequestBody RegisterDTO dto) {
        User user = iUmsUserService.executeRegister(dto);
        if (ObjectUtils.isEmpty(user)) {
            return ApiResult.failed("账号注册失败");
        }
        Map<String, Object> map = new HashMap<>(16);
        map.put("user", user);
        return ApiResult.success(map);
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ApiResult<Map<String, String>> login(@Valid @RequestBody LoginDTO dto) {
        String token = iUmsUserService.executeLogin(dto);
        if (ObjectUtils.isEmpty(token)) {
            return ApiResult.failed("账号密码错误");
        }
        Map<String, String> map = new HashMap<>(16);
        map.put("token", token);
        return ApiResult.success(map, "登录成功");
    }

    public ApiResult<User> getUser(@RequestHeader(value = USER_NAME) String userName) {
        User user = iUmsUserService.getUserByUsername(userName);
        return ApiResult.success(user);
    }
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public ApiResult<Object> logOut() {
        return ApiResult.success(null, "注销成功");
    }
}
