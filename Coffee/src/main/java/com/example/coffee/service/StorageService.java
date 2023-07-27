package com.example.coffee.service;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    boolean save(MultipartFile file, String fileName, String filePath);
}
