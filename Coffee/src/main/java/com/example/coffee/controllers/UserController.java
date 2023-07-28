package com.example.coffee.controllers;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.coffee.common.Api.ApiResult;
import com.example.coffee.dto.LoginDTO;
import com.example.coffee.dto.RegisterDTO;
import com.example.coffee.pojo.Post;
import com.example.coffee.pojo.User;
import com.example.coffee.service.PostService;
import com.example.coffee.service.UserService;
import com.example.coffee.utils.QiniuUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.util.Assert;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.example.coffee.Jwt.JwtUtil.USER_NAME;

@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {
    @Resource
    private UserService iUmsUserService;
    @Resource
    private PostService PostService;

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
        Map<String, String> map = iUmsUserService.executeLogin(dto);
        if (ObjectUtils.isEmpty(map.get("token"))) {
            return ApiResult.failed("账号密码错误");
        }
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

    @GetMapping("/{username}")
    public ApiResult<Map<String, Object>> getUserByName(@PathVariable("username") String username,
                                                        @RequestParam(value = "pageNo", defaultValue = "1") Integer pageNo,
                                                        @RequestParam(value = "size", defaultValue = "10") Integer size) {
        Map<String, Object> map = new HashMap<>(16);
        User user = iUmsUserService.getUserByUsername(username);
        Assert.notNull(user, "用户不存在");
        Page<Post> page = PostService.page(new Page<>(pageNo, size),
                new LambdaQueryWrapper<Post>().eq(Post::getUserId, user.getId()));
        map.put("user", user);
        map.put("topics", page);
        return ApiResult.success(map);
    }
    @PostMapping("/update")
    public ApiResult<User> updateUser(@RequestBody User User) {
        iUmsUserService.updateById(User);
        return ApiResult.success(User);
    }

    @PostMapping("/upload")
    public ApiResult<Map<String,Object>> upload(@RequestParam(defaultValue="li") String user, @RequestParam("file") MultipartFile multipartFile) throws IOException {
        String fileName = StrUtil.format("{}/{}_{}.{}", DateUtil.format(DateUtil.date(), "yyy/MM/dd"), FilenameUtils.getBaseName(multipartFile.getOriginalFilename()), DateUtil.format(new Date(), "yyyyMMdd") + IdUtil.fastUUID(), FilenameUtils.getExtension(multipartFile.getOriginalFilename()));

        QiniuUtils.upload2Qiniu(multipartFile.getBytes(),fileName);
        String headUrl = QiniuUtils.getUrl(fileName);
        QueryWrapper<User> detail = new QueryWrapper<>();
        detail.eq("username",user);
        User cUser = iUmsUserService.getOne(detail);;
        cUser.setAvatarUrl(headUrl);
        iUmsUserService.updateById(cUser);
        Map<String, Object> map = new HashMap<>();
        map.put("imgUrl",headUrl);
        return ApiResult.success(map);
    }
}
