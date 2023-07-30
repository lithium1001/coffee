package com.example.coffee.vo;

import lombok.Data;

import java.util.Date;

@Data
public class ArticleListVo {
    private Integer articleId;
    private String title;
    private  String abs;
    private Date date;
    private  String pictureUrl;
    private  String tag;
}
