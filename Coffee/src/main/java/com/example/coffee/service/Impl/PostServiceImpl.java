package com.example.coffee.service.Impl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.coffee.mapper.PostMapper;
import com.example.coffee.mapper.TagMapper;
import com.example.coffee.pojo.Post;
import com.example.coffee.pojo.PostTag;
import com.example.coffee.pojo.Tags;
import com.example.coffee.service.PostService;
import com.example.coffee.vo.PostVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class PostServiceImpl extends ServiceImpl<PostMapper, Post> implements PostService {
    @Resource
    private TagMapper TagMapper;
    @Autowired
    private com.example.coffee.service.PostTagService PostTagService;
    @Override
    public Page<PostVO> getList(Page<PostVO> page, String tab) {
        // 查询话题
        Page<PostVO> iPage = this.baseMapper.selectListAndPage(page, tab);
        // 查询话题的标签
        iPage.getRecords().forEach(post -> {
            List<PostTag> topicTags = PostTagService.selectByTopicId(post.getPostId());
            if (!topicTags.isEmpty()) {
                List<String> tagIds = topicTags.stream().map(PostTag::getTagId).collect(Collectors.toList());
                List<Tags> tags = TagMapper.selectBatchIds(tagIds);
                post.setTags(tags);
            }
        });
        return iPage;
    }
}
