package com.example.coffee.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.coffee.mapper.ScollectionMapper;
import com.example.coffee.pojo.Scollection;
import com.example.coffee.service.IScollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScollectionServiceImpl extends ServiceImpl<ScollectionMapper, Scollection> implements IScollectionService {

    @Autowired
    private ScollectionMapper scollectionMapper;
    @Override
    public void saveMain(Scollection scollection){
        scollectionMapper.insert(scollection);
    };
}
