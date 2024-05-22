package com.poly.sneaker.service;

import com.poly.sneaker.repository.LoaiGiayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoaiGiayService {
    @Autowired
    private LoaiGiayRepository repository;
}
