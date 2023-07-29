package com.example.coffee.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.coffee.mapper.ACMapper;
import com.example.coffee.pojo.ACollection;
import com.example.coffee.service.IACService;
import org.springframework.stereotype.Service;

@Service
public class ACServiceImpl extends ServiceImpl<ACMapper, ACollection> implements IACService {
}
