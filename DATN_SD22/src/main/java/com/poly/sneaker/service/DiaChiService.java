package com.poly.sneaker.service;

import com.poly.sneaker.repository.DiaChiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DiaChiService {
    @Autowired
    private DiaChiRepository repository;
}
