package com.example.coffee.controllers;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.coffee.pojo.Knowledge;
import com.example.coffee.service.IKnowledgeService;
import com.example.coffee.vo.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/CoffeeVerse")
public class CoffeeController {
@Autowired
private IKnowledgeService knowledgeService;
   /*@GetMapping("/knowledge")
    public Result page(@RequestParam(defaultValue="1") int pageNum,@RequestParam(defaultValue="2")int pageSize){
        log.info("pageNum={},pageSize={}",pageNum,pageSize);
        Page<Knowledge> page = new Page<>(pageNum,pageSize);
        IPage<Knowledge> pageResult=knowledgeService.page(page);
        return Result.suc(pageResult);
    }

    @GetMapping("/knowledge/detail")
    public Result detail(@RequestParam(defaultValue="1") int id) {
        log.info("id={}", id);
        Knowledge knowledge=knowledgeService.getById(id);
        return Result.suc(knowledge);
    }*/
}
