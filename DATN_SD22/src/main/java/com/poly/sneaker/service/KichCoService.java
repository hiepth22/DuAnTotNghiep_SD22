package com.poly.sneaker.service;

import com.poly.sneaker.repository.KichCoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KichCoService {
    @Autowired
    private KichCoRepository repository;
}
