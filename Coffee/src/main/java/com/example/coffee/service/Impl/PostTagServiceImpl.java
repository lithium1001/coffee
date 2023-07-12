package com.example.coffee.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.coffee.mapper.PostTagMapper;
import com.example.coffee.pojo.PostTag;
import com.example.coffee.service.PostTagService;
import org.hibernate.validator.internal.util.stereotypes.ThreadSafe;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class PostTagServiceImpl extends ServiceImpl<PostTagMapper,PostTag> implements PostTagService{
    @Override
    public List<PostTag> selectByTopicId(String postId) {
        QueryWrapper<PostTag> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(PostTag::getPostId, postId);
        return this.baseMapper.selectList(wrapper);
    }

}
