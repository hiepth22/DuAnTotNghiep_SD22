package com.poly.sneaker.service;

import com.poly.sneaker.repository.HoaDonChiTietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HoaDonChiTietService {
    @Autowired
    private HoaDonChiTietRepository repository;
}
