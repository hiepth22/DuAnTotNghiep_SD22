package com.poly.sneaker.service;

import com.poly.sneaker.entity.HoaDon;
import com.poly.sneaker.repository.HoaDonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HoaDonService {
    @Autowired
    private HoaDonRepository hoaDonRepository;

    public HoaDon add(HoaDon hoaDon) {
        return hoaDonRepository.save(hoaDon);
    }
}
