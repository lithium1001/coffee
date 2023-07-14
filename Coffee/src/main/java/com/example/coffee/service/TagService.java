package com.example.coffee.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.coffee.pojo.Tags;

import java.util.List;

public interface TagService extends IService<Tags> {
    List<Tags> insertTags(List<String> tags);
}
