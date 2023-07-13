package com.example.coffee.vo;

import com.example.coffee.pojo.Tags;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostVO implements Serializable {

    private static final long serialVersionUID = -261082150965211545L; //定义程序序列化ID

    private String postId;
    private String userId;
    private String avatarUrl;
    private String username;
    private String title;
    private Integer replynum;
    private String pictureUrl;
    private Date createTime;
    private List<Tags> tags;

}
