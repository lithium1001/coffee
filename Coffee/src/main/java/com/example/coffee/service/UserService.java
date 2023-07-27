package com.example.coffee.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.coffee.dto.LoginDTO;
import com.example.coffee.dto.RegisterDTO;
import com.example.coffee.pojo.User;
import com.example.coffee.vo.ProfileVO;
import com.example.coffee.vo.Result;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Map;

@Service
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
    Map<String, String> executeLogin(LoginDTO dto);

    /**
     * 获取用户信息
     *
     * @param id 用户ID
     * @return
     */
    ProfileVO getUserProfile(String id);

    boolean save(MultipartFile file,String fileName,String filePath);

}
