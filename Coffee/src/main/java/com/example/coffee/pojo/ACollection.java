package com.example.coffee.pojo;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("acollections")
@Data
public class ACollection {
    private  Integer aid;
    private  String userId;
}

