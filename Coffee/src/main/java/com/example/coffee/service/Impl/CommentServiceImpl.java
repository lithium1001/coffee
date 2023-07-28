package com.example.coffee.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.coffee.dto.CommentDTO;
import com.example.coffee.mapper.CommentMapper;
import com.example.coffee.pojo.Comment;
import com.example.coffee.pojo.User;
import com.example.coffee.service.CommentService;
import com.example.coffee.vo.CommentVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
public class CommentServiceImpl extends ServiceImpl<CommentMapper, Comment> implements CommentService {
    @Override
    public List<CommentVO> getCommentsByPostID(String postid) {
        List<CommentVO> Comment = new ArrayList<CommentVO>();
        try {
            Comment = this.baseMapper.getCommentsByPostID(postid);
        } catch (Exception e) {
            log.info("Comment失败");
        }
        return Comment;
    }

    @Override
    public Comment create(CommentDTO dto, User user) {
        Comment comment = Comment.builder()
                .userId(user.getId())
                .content(dto.getContent())
                .postId(dto.getPost_id())
                .createTime(new Date())
                .pictureUrl(dto.getPictureUrl())
                .build();
        this.baseMapper.insert(comment);
        return comment;
    }
}