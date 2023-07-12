package com.example.coffee.pojo;

import com.baomidou.mybatisplus.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Data
@Builder
@TableName("forumposts")
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    private static final long serialVersionUID = 1L;
    @TableId(value = "postId", type = IdType.ASSIGN_ID)
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
    @TableField("`content`")
    private String content;

    /**
     * 作者ID
     */
    @TableField("user_id")
    private String userId;

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
    private Date createTime;

}
