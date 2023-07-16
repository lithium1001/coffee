package com.example.coffee.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.coffee.pojo.Comment;
import com.example.coffee.vo.CommentVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Repository
public interface CommentMapper extends BaseMapper<Comment> {
    /**
     * getCommentsByTopicID
     *
     * @param postid
     * @return
     */
    List<CommentVO> getCommentsByPostID(@Param("postid") String postid);
}
