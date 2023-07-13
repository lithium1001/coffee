package com.example.coffee.dto;

import lombok.Data;

import java.util.List;

@Data
public class CreatePostDTO {
    private static final long serialVersionUID = -5957433707110390852L;
    private String title;
    private String content;
    private List<String> tags;
}

