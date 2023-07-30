package com.example.coffee.pojo;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data  //预编译代码，自动加上getter and setter
@TableName("coffeeshops")
public class Shop {
    private Integer shopId;
    private String name;
    private String phone;
    private Float rating;
    private String tag;
    private String opentime;
    private String description;
    private String pictureUrl;
    private String district;
    private String location;
    private String position;
}
