package com.example.coffee.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.coffee.dto.CommentDTO;
import com.example.coffee.pojo.Comment;
import com.example.coffee.pojo.User;
import com.example.coffee.vo.CommentVO;

import java.util.List;

public interface CommentService extends IService<Comment> {
    /**
     *
     *
     * @param postid
     * @return {@link Comment}
     */
    List<CommentVO> getCommentsByPostID(String postid);
    Comment create(CommentDTO dto, User principal);
}
