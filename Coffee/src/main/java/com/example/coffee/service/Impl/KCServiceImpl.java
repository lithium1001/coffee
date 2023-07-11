package com.example.coffee.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.coffee.mapper.KCMapper;
import com.example.coffee.pojo.KCollection;
import com.example.coffee.service.IKCService;
import org.springframework.stereotype.Service;

@Service
public class KCServiceImpl extends ServiceImpl<KCMapper, KCollection> implements IKCService {
}
