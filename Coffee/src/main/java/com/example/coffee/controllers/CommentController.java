package com.example.coffee.controllers;

import com.example.coffee.common.Api.ApiResult;
import com.example.coffee.dto.CommentDTO;
import com.example.coffee.pojo.Comment;
import com.example.coffee.pojo.User;
import com.example.coffee.service.CommentService;
import com.example.coffee.service.UserService;
import com.example.coffee.vo.CommentVO;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

import static com.example.coffee.Jwt.JwtUtil.USER_NAME;

@RestController
@RequestMapping("/comment")
public class CommentController extends CoffeeController {
    @Resource
    private CommentService CommentService;

    @Resource
    private UserService UserService;

    @GetMapping("/get_comments")
    public ApiResult<List<CommentVO>> getCommentsByTopicID(@RequestParam(value = "postid", defaultValue = "1") String postid) {
        List<CommentVO> lstComment = CommentService.getCommentsByPostID(postid);
        return ApiResult.success(lstComment);
    }

    @PostMapping("/add_comment")
    public ApiResult<Comment> add_comment(@RequestHeader(value = USER_NAME) String userName,
                                          @RequestBody CommentDTO dto) {
        User user = UserService.getUserByUsername(userName);
        Comment comment = CommentService.create(dto, user);
        return ApiResult.success(comment);
    }
}
