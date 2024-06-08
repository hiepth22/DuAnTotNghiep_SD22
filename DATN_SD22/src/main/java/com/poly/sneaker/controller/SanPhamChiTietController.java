package com.poly.sneaker.controller;

import com.poly.sneaker.entity.SanPhamChiTiet;
import com.poly.sneaker.service.SanPhamChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/san-pham-chi-tiet")
@CrossOrigin("*")

public class SanPhamChiTietController {

    @Autowired
    SanPhamChiTietService service;

    @GetMapping("")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/san-pham")
    public ResponseEntity<?> getAllSanPham(@RequestParam("id") Long idSP){
        return ResponseEntity.ok(service.getAllSanPham(idSP));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable(name = "id") Long id) {
        if (!service.existingById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy");
        }
        return ResponseEntity.ok(service.finById(id));
    }

    @PostMapping("")
    public ResponseEntity<?> add(@RequestBody SanPhamChiTiet sanPhamChiTiet) {
        if (service.existingByMa(sanPhamChiTiet.getMa())) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("Mã đã tồn tại");
        }
        return ResponseEntity.ok(service.add(sanPhamChiTiet));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id,
                                    @RequestBody SanPhamChiTiet sanPhamChiTiet) {
        if (!service.existingById(id)) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy cập nhật");
        }
        return ResponseEntity.ok(service.update(id, sanPhamChiTiet));
    }

    @DeleteMapping("/id")
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
        if (!service.existingById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy xóa");
        }
        return ResponseEntity.ok(service.deleteById(id));
    }
}
