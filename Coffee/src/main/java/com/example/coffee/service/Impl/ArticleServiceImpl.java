package com.example.coffee.service.Impl;


import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.coffee.mapper.AMapper;
import com.example.coffee.pojo.Article;
import com.example.coffee.service.IArticleService;
import org.springframework.stereotype.Service;

@Service
public class ArticleServiceImpl extends ServiceImpl<AMapper, Article> implements IArticleService {
}
