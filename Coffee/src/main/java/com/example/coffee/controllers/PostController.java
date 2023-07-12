package com.example.coffee.controllers;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.coffee.common.ApiResult;
import com.example.coffee.service.Impl.PostServiceImpl;
import com.example.coffee.service.PostService;
import com.example.coffee.vo.PostVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.objenesis.SpringObjenesis;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
