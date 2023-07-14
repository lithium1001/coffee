package com.example.coffee.controllers;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.coffee.pojo.Knowledge;
import com.example.coffee.service.IKnowledgeService;
import com.example.coffee.vo.KnowledgeDetailVo;
import com.example.coffee.vo.KnowledgeListVo;
import com.example.coffee.vo.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/CoffeeVerse")
public class KnowledgeController {

    @Autowired
    private IKnowledgeService knowledgeService;
    @GetMapping("/knowledge")
    public Result knowledgepage(@RequestParam(defaultValue="1") int pageNum, @RequestParam(defaultValue="2")int pageSize, @RequestParam(defaultValue = "id") String refer, @RequestParam(defaultValue = "desc") String order,@RequestParam(defaultValue = "all") String filter){

        Page<Knowledge> page = new Page<>(pageNum,pageSize);
        QueryWrapper<Knowledge> query = new QueryWrapper<>();
        if(filter.equals("all")) {;
        }
        else if(filter.equals("冲泡")){
            query.eq("tag","冲泡");
        }
        else if(filter.equals("加工")){
            query.eq("tag","加工");
        }

        if (refer.equals("id")) {
            if(order.equals("asc")){
                query.orderByAsc("k_id");}
            else{
                query.orderByDesc("k_id");
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
        } else if (refer.equals("collections")) {
            if(order.equals("asc")){
                query.orderByAsc("collections");}
            else{
                query.orderByDesc("collections");
            }
        }
        IPage<Knowledge> pageResult=knowledgeService.page(page,query);
        List<Knowledge> knowledges=pageResult.getRecords();
        List voList = new ArrayList();
        for(Knowledge knowledge:knowledges){
            KnowledgeListVo knowledgeListVo=new KnowledgeListVo();
            BeanUtils.copyProperties(knowledge,knowledgeListVo);
            voList.add(knowledgeListVo);
        }
        pageResult.setRecords(voList);
        return Result.suc(pageResult);
    }

    @GetMapping("/knowledge/detail")
    public Result knowledgedetail(@RequestParam(defaultValue="1") int id) {

        QueryWrapper<Knowledge> detail = new QueryWrapper<>();
        detail.eq("k_id",id);
        Knowledge knowledge=knowledgeService.getOne(detail);
        KnowledgeDetailVo knowledgeDetailVo=new KnowledgeDetailVo();
        BeanUtils.copyProperties(knowledge,knowledgeDetailVo);
        return Result.suc(knowledgeDetailVo);
    }
    @GetMapping("/knowledge/query")
    public Result knowledgequery(String q,@RequestParam(defaultValue="1") int pageNum,@RequestParam(defaultValue="2")int pageSize,@RequestParam(defaultValue = "id") String refer,@RequestParam(defaultValue = "desc") String order) {
        if (StringUtils.isBlank(q)) {
            return Result.suc(Collections.emptyList());
        }
        String[] keywords = q.split("\\.");
        QueryWrapper<Knowledge> query = new QueryWrapper<>();
        for (String keyword : keywords) {
            query.or(w -> w.like("title", keyword)
                    .or()
                    .like("tag", keyword));
        }
        if (refer.equals("id")) {
            if(order.equals("asc")){
                query.orderByAsc("k_id");}
            else{
                query.orderByDesc("k_id");
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
        } else if (refer.equals("collections")) {
            if(order.equals("asc")){
                query.orderByAsc("collections");}
            else{
                query.orderByDesc("collections");
            }
        }
        Page<Knowledge> page = new Page<>(pageNum,pageSize);
        IPage<Knowledge> pageResult=knowledgeService.page(page,query);
        List<Knowledge> knowledges=pageResult.getRecords();
        List voList = new ArrayList();
        for(Knowledge knowledge:knowledges){
            KnowledgeListVo knowledgeListVo=new KnowledgeListVo();
            BeanUtils.copyProperties(knowledge,knowledgeListVo);
            voList.add(knowledgeListVo);
        }
        pageResult.setRecords(voList);
        return Result.suc(pageResult);
    }

}