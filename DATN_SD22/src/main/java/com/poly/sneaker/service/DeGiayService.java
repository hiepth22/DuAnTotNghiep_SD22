package com.poly.sneaker.service;

import com.poly.sneaker.repository.DeGiayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeGiayService {
    @Autowired
    private DeGiayRepository repository;
}
