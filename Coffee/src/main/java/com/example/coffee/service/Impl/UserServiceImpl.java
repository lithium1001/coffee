package com.example.coffee.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.coffee.Jwt.JwtUtil;
import com.example.coffee.common.Exception.ApiAsserts;
import com.example.coffee.dto.LoginDTO;
import com.example.coffee.dto.RegisterDTO;
import com.example.coffee.mapper.PostMapper;
import com.example.coffee.mapper.UserMapper;
import com.example.coffee.pojo.User;
import com.example.coffee.service.UserService;
import com.example.coffee.vo.ProfileVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import java.util.Date;

@Slf4j
@Service
@Transactional(rollbackFor = Exception.class)
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Autowired
    private PostMapper PostMapper;

    @Override
    public User executeRegister(RegisterDTO dto) {
        //查询是否有相同用户名的用户
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(User::getUsername, dto.getName()).or().eq(User::getEmail, dto.getEmail());
        User umsUser = baseMapper.selectOne(wrapper);
        if (!ObjectUtils.isEmpty(umsUser)) {
            ApiAsserts.fail("账号或邮箱已存在！");
        }
        User addUser = User.builder()
                .username(dto.getName())
                .password(dto.getPass())
                .email(dto.getEmail())
                .build();
        baseMapper.insert(addUser);

        return addUser;
    }

    public User getUserByUsername(String username) {
        return baseMapper.selectOne(new LambdaQueryWrapper<User>().eq(User::getUsername, username));
    }
    @Override
    public String executeLogin(LoginDTO dto) {
        String token = null;
        try {
            User user = getUserByUsername(dto.getUsername());
            String Pwd =dto.getPassword();
            if(!Pwd.equals(user.getPassword()))
            {
                throw new Exception("密码错误");
            }
            token = JwtUtil.generateToken(String.valueOf(user.getUsername()));
        } catch (Exception e) {
            log.warn("用户不存在or密码验证失败=======>{}", dto.getUsername());
        }
        return token;
    }

    @Override
    public ProfileVO getUserProfile(String id) {
        ProfileVO profile = new ProfileVO();
        User user = baseMapper.selectById(id);
        BeanUtils.copyProperties(user, profile);
        return profile;
    }

}
