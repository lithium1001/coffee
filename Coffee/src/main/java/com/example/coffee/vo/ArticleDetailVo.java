package com.example.coffee.vo;

import lombok.Data;
import net.sf.jsqlparser.expression.DateTimeLiteralExpression;
@Data
public class ArticleDetailVo {
    private Integer articleId;
    private String title;
    private  String abs;
    private  String content;
    private  String pictureUrl;
    //private  DateTimeLiteralExpression.DateTime date;
    private  String tag;
}
