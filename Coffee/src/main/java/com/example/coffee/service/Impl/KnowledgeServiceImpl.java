package com.example.coffee.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.coffee.mapper.KMapper;
import com.example.coffee.pojo.Knowledge;
import com.example.coffee.service.IKnowledgeService;
import org.springframework.stereotype.Service;

@Service
public class KnowledgeServiceImpl extends ServiceImpl<KMapper, Knowledge> implements IKnowledgeService {
}
