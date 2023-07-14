package com.example.coffee.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.coffee.dto.CreatePostDTO;
import com.example.coffee.mapper.PostMapper;
import com.example.coffee.mapper.TagMapper;
import com.example.coffee.mapper.UserMapper;
import com.example.coffee.pojo.Post;
import com.example.coffee.pojo.PostTag;
import com.example.coffee.pojo.Tags;
import com.example.coffee.pojo.User;
import com.example.coffee.service.PostService;
import com.example.coffee.service.PostTagService;
import com.example.coffee.service.TagService;
import com.example.coffee.vo.PostVO;
import com.example.coffee.vo.ProfileVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import org.springframework.util.ObjectUtils;

import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;
@Service
public class PostServiceImpl extends ServiceImpl<PostMapper, Post> implements PostService {
    @Resource
    private TagMapper TagMapper;

    @Resource
    private UserMapper UserMapper;

    @Autowired
    @Lazy
    private com.example.coffee.service.TagService TagService;

    @Autowired
    private com.example.coffee.service.UserService UserService;

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
        setTopicTags(iPage);
        return iPage;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Post create(CreatePostDTO dto, User user) {
        Post topic1 = this.baseMapper.selectOne(new LambdaQueryWrapper<Post>().eq(Post::getTitle, dto.getTitle()));
        Assert.isNull(topic1, "话题已存在，请修改");

        // 封装
        Post topic = Post.builder()
                .userId(user.getId())
                .title(dto.getTitle())
                .content(dto.getContent())
                .createTime(new Date())
                .pictureUrl(dto.getPictureUrl())
                .build();
        this.baseMapper.insert(topic);

        // 标签
        if (!ObjectUtils.isEmpty(dto.getTags())) {
            // 保存标签
            List<Tags> tags = TagService.insertTags(dto.getTags());
            // 处理标签与话题的关联
            PostTagService.createPostTag(topic.getId(), tags);
        }

        return topic;
    }

    @Override
    public Map<String, Object> viewTopic(String id) {
        Map<String, Object> map = new HashMap<>(16);
        Post topic = this.baseMapper.selectById(id);
        Assert.notNull(topic, "当前话题不存在,或已被作者删除");
        // 查询话题详情
        this.baseMapper.updateById(topic);
        topic.setContent(topic.getContent());
        map.put("topic", topic);
        // 标签
        QueryWrapper<PostTag> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(PostTag::getPostId, topic.getId());
        Set<String> set = new HashSet<>();
        for (PostTag articleTag : PostTagService.list(wrapper)) {
            set.add(articleTag.getTagId());
        }
        List<Tags> tags = TagService.listByIds(set);
        map.put("tags", tags);

        // 作者
        ProfileVO user = UserService.getUserProfile(topic.getUserId());
        map.put("user", user);
        return map;
    }

    @Override
    public Page<PostVO> searchByKey(String keyword, Page<PostVO> page) {
        // 查询话题
        Page<PostVO> iPage = this.baseMapper.searchByKey(page, keyword);
        // 查询话题的标签
        setTopicTags(iPage);
        return iPage;
    }

    private void setTopicTags(Page<PostVO> iPage) {
        iPage.getRecords().forEach(topic -> {
            List<PostTag> topicTags = PostTagService.selectByTopicId(topic.getPostId());
            if (!topicTags.isEmpty()) {
                List<String> tagIds = topicTags.stream().map(PostTag::getTagId).collect(Collectors.toList());
                List<Tags> tags = TagMapper.selectBatchIds(tagIds);
                topic.setTags(tags);
            }
        });
    }
}
