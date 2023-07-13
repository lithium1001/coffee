package com.example.coffee.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.coffee.dto.RegisterDTO;
import com.example.coffee.pojo.User;

public interface UserService extends IService<User> {
    User executeRegister(RegisterDTO dto);
}
