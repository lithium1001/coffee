package com.example.coffee.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.coffee.mapper.PostMapper;
import com.example.coffee.pojo.Post;
import com.example.coffee.pojo.PostTag;
import com.example.coffee.pojo.Tags;
import com.example.coffee.vo.PostVO;
import org.springframework.stereotype.Service;

import java.util.List;

public interface PostTagService extends IService<PostTag> {
    List<PostTag> selectByTopicId(String tagId);
    //获取关联记录
    void createPostTag(String id, List<Tags> tags);

}
