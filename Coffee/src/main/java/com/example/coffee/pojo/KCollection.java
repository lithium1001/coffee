package com.example.coffee.pojo;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("kcollections")
@Data
public class KCollection {
    private  Integer id;
    private Integer kid;
    private Integer userId;
    private String kurl;
}

