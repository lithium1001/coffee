package com.example.coffee.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.coffee.dto.LoginDTO;
import com.example.coffee.dto.RegisterDTO;
import com.example.coffee.pojo.User;
import com.example.coffee.vo.ProfileVO;

public interface UserService extends IService<User> {

    User executeRegister(RegisterDTO dto);
    /**
     * 获取用户信息
     *
     * @param username
     * @return dbUser
     */
    User getUserByUsername(String username);
    /**
     * 用户登录
     *
     * @param dto
     * @return 生成的JWT的token
     */
    String executeLogin(LoginDTO dto);

    /**
     * 获取用户信息
     *
     * @param id 用户ID
     * @return
     */
    ProfileVO getUserProfile(String id);

    void updateUserAvatar(User User, String avatar);
}
