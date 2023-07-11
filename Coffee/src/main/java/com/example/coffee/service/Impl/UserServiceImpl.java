package com.example.coffee.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.coffee.mapper.UMapper;
import com.example.coffee.pojo.User;
import com.example.coffee.service.IUserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends ServiceImpl<UMapper, User> implements IUserService {
}
