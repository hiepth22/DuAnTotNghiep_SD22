package com.poly.sneaker.service;

import com.poly.sneaker.repository.VaiTroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VaiTroService {
    @Autowired
    private VaiTroRepository repository;
}
