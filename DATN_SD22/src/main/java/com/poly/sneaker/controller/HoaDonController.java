package com.poly.sneaker.controller;

import com.poly.sneaker.entity.HoaDon;
import com.poly.sneaker.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hoa-don")
@CrossOrigin("*")

public class HoaDonController {

    @Autowired
    HoaDonService hoaDonService;

    @GetMapping("")
    public ResponseEntity<List<HoaDon>> getAllHoaDon() {
        List<HoaDon> hoaDons = hoaDonService.getAll();
        return ResponseEntity.ok(hoaDons);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addHoaDon(@RequestBody HoaDon hoaDon) {
        System.out.println("test");
        return ResponseEntity.ok(hoaDonService.add(hoaDon));
    }
}
