package com.example.coffee.vo;

import lombok.Data;

import java.util.Date;

@Data
public class CommentVO {
    private String id;

    private String content;

    private String postId;

    private String userId;

    private String username;

    private Date createTime;

    private String pictureUrl;

    private String aUrl;
}
