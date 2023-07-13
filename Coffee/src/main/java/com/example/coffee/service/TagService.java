package com.example.coffee.service;

import com.example.coffee.pojo.Tags;

import java.util.List;

public interface TagService {
    List<Tags> insertTags(List<String> tags);
}
