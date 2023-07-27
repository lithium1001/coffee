package com.example.coffee.config;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.coffee.dto.LoginDTO;
import com.example.coffee.dto.RegisterDTO;
import com.example.coffee.pojo.User;
import com.example.coffee.service.UserService;
import com.example.coffee.vo.ProfileVO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Collection;
import java.util.Map;
import java.util.function.Function;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Value("${upload.accessPath}")
    private String accessPath;

    @Value("${upload.serverPath}")
    private String serverPath;
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){
        registry.addResourceHandler(accessPath+"**").addResourceLocations("file:"+serverPath);
    }
    @Bean
    public UserService userService(){
        return new UserService() {
            @Override
            public User executeRegister(RegisterDTO dto) {
                return null;
            }

            @Override
            public User getUserByUsername(String username) {
                return null;
            }

            @Override
            public Map<String, String> executeLogin(LoginDTO dto) {
                return null;
            }

            @Override
            public ProfileVO getUserProfile(String id) {
                return null;
            }

            @Override
            public boolean save(MultipartFile file, String fileName, String filePath) {
                return false;
            }

            @Override
            public boolean saveBatch(Collection<User> entityList, int batchSize) {
                return false;
            }

            @Override
            public boolean saveOrUpdateBatch(Collection<User> entityList, int batchSize) {
                return false;
            }

            @Override
            public boolean updateBatchById(Collection<User> entityList, int batchSize) {
                return false;
            }

            @Override
            public boolean saveOrUpdate(User entity) {
                return false;
            }

            @Override
            public User getOne(Wrapper<User> queryWrapper, boolean throwEx) {
                return null;
            }

            @Override
            public Map<String, Object> getMap(Wrapper<User> queryWrapper) {
                return null;
            }

            @Override
            public <V> V getObj(Wrapper<User> queryWrapper, Function<? super Object, V> mapper) {
                return null;
            }

            @Override
            public BaseMapper<User> getBaseMapper() {
                return null;
            }

            @Override
            public Class<User> getEntityClass() {
                return null;
            }
        };
    }
}
