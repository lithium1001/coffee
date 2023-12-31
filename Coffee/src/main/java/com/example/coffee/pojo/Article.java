package com.example.coffee.pojo;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

@TableName("articles")
@Data
public class Article {
    private Integer articleId;
    private String title;
    private  String abs;
    private  String content;
    private  String pictureUrl;
    private Date date;
    private  String tag;

}
