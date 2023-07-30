package com.example.coffee.controllers;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.coffee.common.Api.ApiResult;
import com.example.coffee.dto.CreatePostDTO;
import com.example.coffee.pojo.Post;
import com.example.coffee.pojo.User;
import com.example.coffee.service.PostService;
import com.example.coffee.service.UserService;
import com.example.coffee.vo.PostVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

import java.util.Map;

import static com.example.coffee.Jwt.JwtUtil.USER_NAME;

@Slf4j
@RestController
@RequestMapping("/post")
public class PostController extends CoffeeController {
    @Resource
    private PostService PostService;
    @Resource
    private UserService UserService;

    @GetMapping("/list")
    public ApiResult<Page<PostVO>> list(@RequestParam(value = "tab", defaultValue = "latest") String tab,
                                        @RequestParam(value = "pageNo", defaultValue = "1")  Integer pageNo,
                                        @RequestParam(value = "size", defaultValue = "100") Integer pageSize) {
        Page<PostVO> list = PostService.getList(new Page<>(pageNo, pageSize),tab);
        return ApiResult.success(list);
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ApiResult<Post> create(@RequestHeader(value = USER_NAME) String userName
            , @RequestBody CreatePostDTO dto) {
        User user = UserService.getUserByUsername(userName);
        Post topic = PostService.create(dto, user);
        return ApiResult.success(topic);
    }

    @GetMapping("/detail")
    public ApiResult<Map<String, Object>> view(@RequestParam("id") String id) {
        Map<String, Object> map = PostService.viewTopic(id);
        return ApiResult.success(map);
    }

    @DeleteMapping("/delete/{id}")
    public ApiResult<String> delete(@RequestHeader(value = USER_NAME) String userName, @PathVariable("id") String id) {
        User umsUser = UserService.getUserByUsername(userName);
        Post byId = PostService.getById(id);
        Assert.notNull(byId, "来晚一步，话题已不存在");
        Assert.isTrue(byId.getUserId().equals(umsUser.getId()), "你为什么可以删除别人的话题？？？");
        PostService.removeById(id);
        return ApiResult.success(null,"删除成功");
    }

}
