package com.example.coffee.controllers;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.coffee.pojo.Article;
import com.example.coffee.service.IArticleService;
import com.example.coffee.vo.ArticleDetailVo;
import com.example.coffee.vo.ArticleListVo;
import com.example.coffee.vo.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/CoffeeVerse")
public class ArticleController {
    @Autowired
    private IArticleService articleService;
    @GetMapping("/articles")
    public Result articlepage(@RequestParam(defaultValue="1") int pageNum, @RequestParam(defaultValue="2")int pageSize, @RequestParam(defaultValue = "id") String refer, @RequestParam(defaultValue = "asc") String order){
        Page<Article> page = new Page<>(pageNum,pageSize);
        QueryWrapper<Article> query = new QueryWrapper<>();
        if (refer.equals("id")) {
            if(order.equals("asc")){
                query.orderByAsc("article_id");}
            else{
                query.orderByDesc("article_id");
            }
        } else if (refer.equals("title")) {
            if(order.equals("asc")){
                query.orderByAsc("title");}
            else{
                query.orderByDesc("title");
            }
        } else if (refer.equals("tag")) {
            if(order.equals("asc")){
                query.orderByAsc("tag");}
            else{
                query.orderByDesc("tag");
            }
        } else if (refer.equals("date")) {
            if(order.equals("asc")){
                query.orderByAsc("date");}
            else{
                query.orderByDesc("date");
            }
        }
        IPage<Article> pageResult=articleService.page(page,query);
        List<Article> articles=pageResult.getRecords();
        List voList = new ArrayList();
        for(Article article:articles){
            ArticleListVo articleListVo=new ArticleListVo();
            BeanUtils.copyProperties(article,articleListVo);
            voList.add(articleListVo);
        }
        pageResult.setRecords(voList);
        return Result.suc(pageResult);
    }

    @GetMapping("/articles/detail")
    public Result articledetail(@RequestParam(defaultValue="1") int id) {
        QueryWrapper<Article> detail = new QueryWrapper<>();
        detail.eq("article_id",id);
        Article article=articleService.getOne(detail);
        ArticleDetailVo articleDetailVo=new ArticleDetailVo();
        BeanUtils.copyProperties(article,articleDetailVo);
        return Result.suc(articleDetailVo);
    }
    @GetMapping("/articles/query")
    public Result articlequery(String q,@RequestParam(defaultValue="1") int pageNum,@RequestParam(defaultValue="2")int pageSize,@RequestParam(defaultValue = "id") String refer,@RequestParam(defaultValue = "asc") String order) {
        if (StringUtils.isBlank(q)) {
            return Result.suc(Collections.emptyList());
        }
        String[] keywords = q.split("\\.");
        QueryWrapper<Article> query = new QueryWrapper<>();
        for (String keyword : keywords) {
            query.or(w -> w.like("title", keyword)
                    .or()
                    .like("tag", keyword)
                    .or()
                    .like("abs",keyword)
                    .or()
                    .like("content",keyword));
        }
        if (refer.equals("id")) {
            if(order.equals("asc")){
                query.orderByAsc("article_id");}
            else{
                query.orderByDesc("article_id");
            }
        } else if (refer.equals("title")) {
            if(order.equals("asc")){
                query.orderByAsc("title");}
            else{
                query.orderByDesc("title");
            }
        } else if (refer.equals("tag")) {
            if(order.equals("asc")){
                query.orderByAsc("tag");}
            else{
                query.orderByDesc("tag");
            }
        } else if (refer.equals("date")) {
            if(order.equals("asc")){
                query.orderByAsc("date");}
            else{
                query.orderByDesc("date");
            }
        }
        Page<Article> page = new Page<>(pageNum,pageSize);
        IPage<Article> pageResult=articleService.page(page,query);
        List<Article> articles=pageResult.getRecords();
        List voList = new ArrayList();
        for(Article article:articles){
            ArticleListVo articleListVo=new ArticleListVo();
            BeanUtils.copyProperties(article,articleListVo);
            voList.add(articleListVo);
        }
        pageResult.setRecords(voList);
        return Result.suc(pageResult);
    }
}
