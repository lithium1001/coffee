package com.example.coffee.controllers;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.coffee.common.Api.ApiResult;
import com.example.coffee.pojo.Post;
import com.example.coffee.pojo.Tags;
import com.example.coffee.service.TagService;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/tag")
public class TagController extends CoffeeController{
    @Resource
    private TagService TagService;

    @GetMapping("/{name}")
    public ApiResult<Map<String, Object>> getTopicsByTag(
            @PathVariable("name") String tagName,
            @RequestParam(value="page",defaultValue = "1") Integer page,
            @RequestParam(value="size",defaultValue = "10") Integer size){
        Map<String, Object> map = new HashMap<>(16);

        LambdaQueryWrapper<Tags> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Tags::getName, tagName);
        Tags one = TagService.getOne(wrapper);
        Assert.notNull(one, "话题不存在");
        Page<Post> topics = TagService.selectTopicsByTagId(new Page<>(page, size), one.getId());
        // 其他热门标签
        Page<Tags> hotTags = TagService.page(new Page<>(1, 10),
                new LambdaQueryWrapper<Tags>()
                        .notIn(Tags::getName, tagName)
                        .orderByDesc(Tags::getTopicCount));

        map.put("topics", topics);
        map.put("hotTags", hotTags);

        return ApiResult.success(map);
    }
}
