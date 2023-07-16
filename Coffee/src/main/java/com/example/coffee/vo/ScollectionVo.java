package com.example.coffee.vo;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("scollections")
public class ScollectionVo {
    //private Integer userId;
    //private Integer shopId;
    private String sUrl;
    private String name;
    private String pictureUrl;
    private String phone;
    private Float rating;
}
