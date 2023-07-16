package com.example.coffee.pojo;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("scollections")
public class Scollection {
    private Integer shopId;
    private Integer userId;
    private String sUrl;
}
