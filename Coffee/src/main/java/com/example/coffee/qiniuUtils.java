package com.example.coffee;

import com.qiniu.http.Response;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.Region;
import com.qiniu.storage.UploadManager;
import com.qiniu.util.Auth;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Component
public class qiniuUtils {

    // 读取 application.yml 配置文件中的信息
    @Value("${qiniu.url}")
    private String url;

    @Value("${qiniu.accessKey}")
    private String accessKey;

    @Value("${qiniu.accessSecretKey}")
    private String accessSecretKey;

    @Value("${qiniu.bucket}")
    private String bucket;

    /**
     * 图片上传
     *
     * @param file     对象
     * @param fileName 文件名
     * @return
     */
    public boolean uploadSingleFile(MultipartFile file, String fileName) {
        //构造一个带指定 Region 对象的配置类

        Configuration cfg = new Configuration(Region.huanan());
        //...其他参数参考类注释
        UploadManager uploadManager = new UploadManager(cfg);
        //默认不指定key的情况下，以文件内容的hash值作为文件名
        try {
            byte[] fileOfBytes = file.getBytes();
            Auth auth = Auth.create(accessKey, accessSecretKey);
            String upToken = auth.uploadToken(bucket);
            Response response = uploadManager.put(fileOfBytes, fileName, upToken);
            return true;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return false;
    }
}

