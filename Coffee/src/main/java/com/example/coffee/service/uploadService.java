package com.example.coffee.service;

import com.example.coffee.vo.Result;
import com.example.coffee.qiniuUtils;

import java.io.File;

public interface uploadService {
   /* public Result uploadFileToQiniu(File file) {
        String fileName = uploadToQiniu(file);
        return Result.suc(file);
    }*/

    /**
     * 存储文件到七牛云
     * @param file
     * @return 文件名
     */
    private String uploadToQiniu(File file) {
        String originalFilename = file.getName();
        String suffix = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
        String fileName = System.currentTimeMillis() + "." + suffix;

        boolean flag = qiniuUtils.uploadSingleFile(file, fileName);
        if(flag){
            return fileName;
        }
        return null;
    }

}
