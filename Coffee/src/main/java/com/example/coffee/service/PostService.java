package com.example.coffee.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.coffee.pojo.Post;
import com.example.coffee.vo.PostVO;

public interface PostService extends IService<Post> {
    Page<PostVO> getList(Page<PostVO> page, String tab);
}
