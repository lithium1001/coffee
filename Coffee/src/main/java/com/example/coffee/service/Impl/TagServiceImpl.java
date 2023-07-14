package com.example.coffee.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.coffee.mapper.TagMapper;
import com.example.coffee.pojo.Post;
import com.example.coffee.pojo.Tags;
import com.example.coffee.service.PostTagService;
import com.example.coffee.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class TagServiceImpl extends ServiceImpl<TagMapper, Tags> implements TagService {
    @Autowired
    private com.example.coffee.service.PostTagService PostTagService;

    @Autowired
    private com.example.coffee.service.PostService PostService;

    @Override
    public List<Tags> insertTags(List<String> tagNames) {
        List<Tags> tagList = new ArrayList<>();
        for (String tagName : tagNames) {
            Tags tag = this.baseMapper.selectOne(new LambdaQueryWrapper<Tags>().eq(Tags::getName, tagName));
            if (tag == null) {
                tag = Tags.builder().name(tagName).build();
                this.baseMapper.insert(tag);
            } else {
                tag.setTopicCount(tag.getTopicCount() + 1);
                this.baseMapper.updateById(tag);
            }
            tagList.add(tag);
        }
        return tagList;
    }
    @Override
    public Page<Post> selectTopicsByTagId(Page<Post> topicPage, String id) {

        // 获取关联的话题ID
        Set<String> ids = PostTagService.selectTopicIdsByTagId(id);
        LambdaQueryWrapper<Post> wrapper = new LambdaQueryWrapper<>();
        wrapper.in(Post::getId, ids);

        return PostService.page(topicPage, wrapper);
    }
}
