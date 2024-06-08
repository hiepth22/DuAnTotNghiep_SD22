package com.poly.sneaker.controller;

import com.poly.sneaker.dto.SanPhamChiTietCustom;
import com.poly.sneaker.entity.HoaDon;
import com.poly.sneaker.service.BanHangTaiQuayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ban-hang-tai-quay")
@CrossOrigin("*")

public class BanHangController {

    @Autowired
    BanHangTaiQuayService banHangTaiQuayService;

    @GetMapping("/san-pham-chi-tiet")
    public ResponseEntity<List<SanPhamChiTietCustom>> getAllSanPhamCT() {
        List<SanPhamChiTietCustom> sanPhamChiTietCustoms = banHangTaiQuayService.getAllCTSP();
        return ResponseEntity.ok(sanPhamChiTietCustoms);
    }


}
