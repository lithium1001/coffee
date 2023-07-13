package com.example.coffee.controllers;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.coffee.common.Api.ApiResult;
import com.example.coffee.service.PostService;
import com.example.coffee.vo.PostVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
@Slf4j
@RestController
@RequestMapping("/post")
public class PostController extends CoffeeController {
    @Resource
    private PostService PostService;

    @GetMapping("/list")
    public ApiResult<Page<PostVO>> list(@RequestParam(value = "tab", defaultValue = "latest") String tab,
                                        @RequestParam(value = "pageNo", defaultValue = "1")  Integer pageNo,
                                        @RequestParam(value = "size", defaultValue = "10") Integer pageSize) {
        Page<PostVO> list = PostService.getList(new Page<>(pageNo, pageSize),tab);
        return ApiResult.success(list);
    }

}
