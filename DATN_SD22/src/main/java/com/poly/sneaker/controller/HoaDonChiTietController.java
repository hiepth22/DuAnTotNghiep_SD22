package com.poly.sneaker.controller;

import com.poly.sneaker.dto.HoaDonChiTietCustom;
import com.poly.sneaker.entity.HoaDon;
import com.poly.sneaker.entity.HoaDonChiTiet;
import com.poly.sneaker.service.HoaDonChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin("*")

public class HoaDonChiTietController {

    @Autowired
    HoaDonChiTietService hoaDonChiTietService;

    @GetMapping("/{id}")
    public ResponseEntity<List<HoaDonChiTietCustom>> getHoaDonChiTietByHoaDonId(@PathVariable Long id) {
        List<HoaDonChiTietCustom> hoaDonChiTietCustoms = hoaDonChiTietService.getAllByHoaDonId(id);
        if (hoaDonChiTietCustoms.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(hoaDonChiTietCustoms);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody HoaDon hoaDon) {
        HoaDonChiTiet hoaDonChiTiet = new HoaDonChiTiet();
        hoaDonChiTiet.setHoaDon(hoaDon);
        HoaDonChiTiet addhdct = hoaDonChiTietService.addHoaDonChiTiet(hoaDonChiTiet);
        return ResponseEntity.ok(addhdct);
    }



}
