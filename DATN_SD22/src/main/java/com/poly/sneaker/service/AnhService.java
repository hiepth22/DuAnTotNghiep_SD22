package com.poly.sneaker.service;

import com.poly.sneaker.repository.AnhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnhService {
    @Autowired
    private AnhRepository repository;
}
