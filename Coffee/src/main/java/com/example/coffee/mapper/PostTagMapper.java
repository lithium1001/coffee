package com.example.coffee.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.coffee.pojo.PostTag;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface PostTagMapper extends BaseMapper<PostTag> {
    Set<String> getTopicIdsByTagId(@Param("id") String id);
}
