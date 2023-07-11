package com.example.coffee.pojo;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
@TableName("users")
@Data
public class User {
    private Integer userId;
    private String username;
    private String password;
    private String email;
    private String avatarUrl;
}
