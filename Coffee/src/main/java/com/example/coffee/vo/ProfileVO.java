package com.example.coffee.vo;

import lombok.Data;

@Data
public class ProfileVO {

    private String id;
    /**
     * 用户名
     */
    private String username;

    /**
     * 头像
     */
    private String avatarUrl;

}
