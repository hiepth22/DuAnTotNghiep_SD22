package com.poly.sneaker.controller;

import com.poly.sneaker.entity.HoaDon;
import com.poly.sneaker.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
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
        return ResponseEntity.ok(hoaDonService.add(hoaDon));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateTrangThaiHD(@PathVariable Long id,@RequestBody HoaDon hoaDon) {
        return ResponseEntity.ok(hoaDonService.updateTrangThai(id, hoaDon));
    }
}
