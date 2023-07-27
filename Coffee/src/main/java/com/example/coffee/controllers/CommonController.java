package com.example.coffee.controllers;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.StrUtil;
import com.example.coffee.pojo.User;
import com.example.coffee.service.StorageService;
import com.example.coffee.service.UserService;
import com.example.coffee.vo.Result;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

@RestController
@Slf4j
@RequestMapping("/CoffeeVerse")
public class CommonController {
    @Resource
    private UserService iUmsUserService;
    @Autowired
    private StorageService storageService;

    @Value("${upload.accessPath}")
    private String accessPath;

    @Value("${upload.serverPath}")
    private String serverPath;

    @PostMapping(value = "/upload")
    public Result upload(@RequestParam(value = "userName") String userName, HttpServletRequest request, HttpServletResponse response){
        MultipartHttpServletRequest multipartHttpServletRequest=(MultipartHttpServletRequest) request;
        MultipartFile file= multipartHttpServletRequest.getFile("file");
        String fileName = StrUtil.format("{}/{}_{}.{}", DateUtil.format(DateUtil.date(), "yyy/MM/dd"), FilenameUtils.getBaseName(file.getOriginalFilename()), DateUtil.format(new Date(), "yyyyMMdd") + IdUtil.fastUUID(), FilenameUtils.getExtension(file.getOriginalFilename()));
        storageService.save(file,fileName,serverPath);
        User cUser = iUmsUserService.getUserByUsername(userName);
        cUser.setAvatarUrl(accessPath+fileName);
        iUmsUserService.updateById(cUser);
        return Result.suc(accessPath+fileName);
    }
}
