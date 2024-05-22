package com.poly.sneaker.service;

import com.poly.sneaker.repository.CoGiayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CoGiayService {
    @Autowired
    private CoGiayRepository repository;
}
