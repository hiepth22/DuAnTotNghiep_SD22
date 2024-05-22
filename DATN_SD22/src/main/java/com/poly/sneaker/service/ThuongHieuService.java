package com.poly.sneaker.service;

import com.poly.sneaker.repository.ThuongHieuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ThuongHieuService {
    @Autowired
    private ThuongHieuRepository repository;
}
