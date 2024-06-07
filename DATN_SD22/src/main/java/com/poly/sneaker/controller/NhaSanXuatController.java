package com.poly.sneaker.controller;

import com.poly.sneaker.entity.NhaSanXuat;
import com.poly.sneaker.service.NhaSanXuatService;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/nha-san-xuat")
@CrossOrigin("*")

public class NhaSanXuatController {

    @Autowired
    NhaSanXuatService service;

    @GetMapping("")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable(name = "id") Long id) {
        if (!service.existingById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy");
        }
        return ResponseEntity.ok(service.finById(id));
    }

    @PostMapping("")
    public ResponseEntity<?> add(@RequestBody NhaSanXuat nhaSanXuat) {
        if (service.existingByTen(nhaSanXuat.getTen())) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("Tên đã tồn tại");
        }
        return ResponseEntity.ok(service.add(nhaSanXuat));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id,
                                    @RequestBody NhaSanXuat nhaSanXuat) {
        if (!service.existingById(id)) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy cập nhật");
        }
        return ResponseEntity.ok(service.update(id, nhaSanXuat));
    }

    @DeleteMapping("/id")
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
        if (!service.existingById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy xóa");
        }
        return ResponseEntity.ok(service.deleteById(id));
    }
}
