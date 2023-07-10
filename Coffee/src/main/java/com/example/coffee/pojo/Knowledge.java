package com.example.coffee.pojo;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("knowledge")

public class Knowledge {
    public String kId;
    public String title;
    public String videoUrl;
    public String tag;
    public Integer collections;
}
