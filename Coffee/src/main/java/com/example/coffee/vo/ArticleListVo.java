package com.example.coffee.vo;

import lombok.Data;
import net.sf.jsqlparser.expression.DateTimeLiteralExpression;
@Data
public class ArticleListVo {
    private Integer articleId;
    private String title;
    private  String abs;
    private  String pictureUrl;
    private  String tag;
}
