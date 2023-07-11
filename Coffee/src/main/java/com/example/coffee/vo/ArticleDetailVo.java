package com.example.coffee.vo;

import lombok.Data;

import java.util.Date;

@Data
public class ArticleDetailVo {
    private Integer articleId;
    private String title;
    private  String abs;
    private  String content;
    private  String pictureUrl;
    private Date date;
    private  String tag;
}
