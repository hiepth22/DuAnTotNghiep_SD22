package com.poly.sneaker.controller;

import com.poly.sneaker.entity.PhieuGiamGia;
import com.poly.sneaker.service.PhieuGiamGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/phieu-giam-gia")
@CrossOrigin("*")

public class PhieuGiamGiaController {

    @Autowired
    PhieuGiamGiaService phieuGiamGiaService;

    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(phieuGiamGiaService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable(name = "id") Long id) {
        if (!phieuGiamGiaService.existingById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy");
        }
        return ResponseEntity.ok(phieuGiamGiaService.finById(id));
    }

    @PostMapping("")
    public ResponseEntity<?> add(@RequestBody PhieuGiamGia phieuGiamGia) {
        if (phieuGiamGiaService.existingByTen(phieuGiamGia.getTen())) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("Tên đã tồn tại");
        }
        return ResponseEntity.ok(phieuGiamGiaService.add(phieuGiamGia));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id,
                                    @RequestBody PhieuGiamGia phieuGiamGia) {
        if (!phieuGiamGiaService.existingById(id)) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy cập nhật");
        }
        return ResponseEntity.ok(phieuGiamGiaService.update(id, phieuGiamGia));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
        if (!phieuGiamGiaService.existingById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy xóa");
        }
        return ResponseEntity.ok(phieuGiamGiaService.deleteById(id));
    }

}