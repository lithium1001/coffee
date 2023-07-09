package com.example.test.controllers;

import com.example.test.mapper.TestMapper;
import com.example.test.pojo.Test;
import com.example.test.vo.Result;
import com.example.test.vo.TestVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/test")
public class TestController {

    @Autowired
    private TestMapper testMapper;

    @GetMapping("/list")
    public String list(@RequestParam(defaultValue="1") int pageNum){
        log.info("pageNum={}",pageNum);
        return"this is list";
    }

    @GetMapping("/detail/{id}")
    public Result detail(@PathVariable int id){
        log.info("id={}",id);
      /*  var testVo=new TestVo();
        testVo.name="l";
        testVo.des="i";*/

        Test test=testMapper.selectById(id);
        return Result.suc(test);
    }

    @PostMapping("/add")
    public String add(@RequestBody Test test){
        log.info("name={},des={}",test.name,test.description);
        return"this is add";
    }

    @PutMapping("/edit")
    public String edit(@RequestBody Test test){
        log.info("edit name={},des={}",test.name,test.description);
        return"this is edit";
    }

    @DeleteMapping("/delete")
    public String delete(){
        return"this is delete";
    }
}
