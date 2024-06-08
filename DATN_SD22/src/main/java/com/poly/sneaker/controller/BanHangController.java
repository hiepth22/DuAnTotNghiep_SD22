package com.poly.sneaker.controller;

import com.poly.sneaker.dto.HoaDonChiTietReqest;
import com.poly.sneaker.dto.SanPhamChiTietCustom;
import com.poly.sneaker.entity.HoaDon;
import com.poly.sneaker.entity.HoaDonChiTiet;
import com.poly.sneaker.service.BanHangTaiQuayService;
import com.poly.sneaker.service.HoaDonChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ban-hang-tai-quay")
@CrossOrigin("*")

public class BanHangController {

    @Autowired
    BanHangTaiQuayService banHangTaiQuayService;

    @Autowired
    HoaDonChiTietService hoaDonChiTietService;

    @GetMapping("/san-pham-chi-tiet")
    public ResponseEntity<List<SanPhamChiTietCustom>> getAllSanPhamCT() {
        List<SanPhamChiTietCustom> sanPhamChiTietCustoms = banHangTaiQuayService.getAllCTSP();
        return ResponseEntity.ok(sanPhamChiTietCustoms);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody HoaDonChiTietReqest hoaDonChiTietRequest) {
        HoaDonChiTiet updatedHoaDonChiTiet = hoaDonChiTietService.updateSanPham(hoaDonChiTietRequest, id);

        System.out.println(hoaDonChiTietRequest.getIdChiTietSanPham());
        System.out.println(hoaDonChiTietRequest.getDonGia());
        System.out.println(hoaDonChiTietRequest.getSoLuong());
        System.out.println(id);

        if (updatedHoaDonChiTiet != null) {
            return ResponseEntity.ok(updatedHoaDonChiTiet);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hóa đơn chi tiết hoặc chi tiết sản phẩm không tồn tại");
        }
    }


}
