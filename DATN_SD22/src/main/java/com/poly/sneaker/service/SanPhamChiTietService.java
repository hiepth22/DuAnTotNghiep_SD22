package com.poly.sneaker.service;

import com.poly.sneaker.repository.SanPhamChiTietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SanPhamChiTietService {
    @Autowired
    private SanPhamChiTietRepository repository;
}
