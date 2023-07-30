package com.example.coffee.pojo;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Data
@Builder
@TableName("forumposts")
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    private static final long serialVersionUID = 1L;

    @TableId(value = "post_id", type = IdType.ASSIGN_ID)
    private String id;
    /**
     * 标题
     */
    @NotBlank(message = "标题不可以为空")
    @TableField(value = "title")
    private String title;
    /**
     * markdown
     */
    @NotBlank(message = "内容不可以为空")
    @TableField("content")
    private String content;

    /**
     * 作者ID
     */
    @TableField("user_id")
    private String userId;

    @TableField("picture_url")
    private String pictureUrl;
    @TableField("avatar_url")
    private String avatarUrl;
    @TableField("username")
    private String username;
    /**
     * 评论数
     */
    @TableField("replynum")
    @Builder.Default
    private Integer comments = 0;

    /**
     * 创建时间
     */
    @TableField(value = "create_time", fill = FieldFill.INSERT)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;
}
