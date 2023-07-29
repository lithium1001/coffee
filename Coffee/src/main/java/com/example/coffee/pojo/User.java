package com.example.coffee.pojo;


import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Builder
@TableName("users")
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class User {
    private static final long serialVersionUID = -5051120337175047163L;

    @TableId(value = "user_id", type = IdType.ASSIGN_ID)
    private String id;

    @TableField("username")
    private String username;

    @TableField("email")
    private String email;

    @JsonIgnore()
    @TableField("password")
    private String password;

    @Builder.Default
    @TableField("avatar_url")
    private String avatarUrl = "defaultAvatar";

//    @Builder.Default
//    @TableField("active")
//    private Boolean active = true;
}
