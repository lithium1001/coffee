package com.example.coffee.vo;

import lombok.Data;

@Data
public class UserVo {
    private Integer userId;
    private String username;
    private String password;
    private String email;
    private String avatarUrl;
}
