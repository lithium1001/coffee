package com.example.coffee.pojo;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("kcollections")
@Data
public class KCollection {
    private Integer kId;
    private Integer userId;
    private String kUrl;
}

