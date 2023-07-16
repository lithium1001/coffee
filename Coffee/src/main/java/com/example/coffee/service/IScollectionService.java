package com.example.coffee.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.coffee.pojo.Scollection;

public interface IScollectionService extends IService<Scollection> {
    void saveMain(Scollection scollection);
}
