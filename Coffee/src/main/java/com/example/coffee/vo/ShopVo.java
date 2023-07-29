package com.example.coffee.vo;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
public class ShopVo {
    //private Integer shopId;
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
    private boolean isCollection = false;
}
