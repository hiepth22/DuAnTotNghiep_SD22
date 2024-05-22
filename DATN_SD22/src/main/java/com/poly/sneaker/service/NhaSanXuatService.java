package com.poly.sneaker.service;

import com.poly.sneaker.repository.NhaSanXuatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NhaSanXuatService {
    @Autowired
    private NhaSanXuatRepository repository;
}
