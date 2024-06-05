package com.poly.sneaker.controller;

import com.poly.sneaker.entity.HoaDon;
import com.poly.sneaker.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hoa-don")
@CrossOrigin("*")

public class HoaDonController {

    @Autowired
    HoaDonService hoaDonService;

    @PostMapping("/add")
    public ResponseEntity<?> addHoaDon(@RequestBody HoaDon hoaDon) {
        return ResponseEntity.ok(hoaDonService.add(hoaDon));
    }
}
