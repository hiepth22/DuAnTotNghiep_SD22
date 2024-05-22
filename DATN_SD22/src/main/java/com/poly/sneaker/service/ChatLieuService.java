package com.poly.sneaker.service;

import com.poly.sneaker.repository.ChatLieuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatLieuService {
    @Autowired
    private ChatLieuRepository repository;
}
