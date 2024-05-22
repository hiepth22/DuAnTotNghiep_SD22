package com.poly.sneaker.service;

import com.poly.sneaker.repository.PhieuGiamGiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PhieuGiamGiaService {
    @Autowired
    private PhieuGiamGiaRepository repository;
}
