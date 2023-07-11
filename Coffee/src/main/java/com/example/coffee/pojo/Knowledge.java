package com.example.coffee.pojo;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("knowledge")
@Data
public class Knowledge {
    private Integer kId;
    private String title;
    private String videoUrl;
    private String tag;
    private Integer collections;

}
