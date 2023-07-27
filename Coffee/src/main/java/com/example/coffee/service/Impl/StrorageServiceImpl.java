package com.example.coffee.service.Impl;

import com.example.coffee.service.StorageService;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
@Service
public class StrorageServiceImpl implements StorageService {
    @Override
    public boolean save(MultipartFile file, String fileName, String filePath){
        String path =filePath+fileName;
        File targetFile = new File(path);
        try {
            FileCopyUtils.copy(file.getBytes(),targetFile);
            return true;
        } catch (IOException e) {

        }
        return false;
    };
}
