package com.poly.sneaker.service;

import com.poly.sneaker.repository.MauSacRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MauSacService {
    @Autowired
    private MauSacRepository repository;
}
