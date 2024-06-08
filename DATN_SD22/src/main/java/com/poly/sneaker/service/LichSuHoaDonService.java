package com.poly.sneaker.service;

import com.poly.sneaker.repository.LichSuHoaDonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LichSuHoaDonService {
    @Autowired
    private LichSuHoaDonRepository repository;
}
