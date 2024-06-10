package com.poly.sneaker.controller;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.poly.sneaker.entity.ChatLieu;
import com.poly.sneaker.service.ChatLieuService;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

import java.sql.Timestamp;

@RestController
@RequestMapping("/chat-lieu")
@CrossOrigin("*")

public class ChatLieuController {

    @Autowired
    ChatLieuService service;

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

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody ChatLieu chatLieu) {
        if (service.existingByTen(chatLieu.getTen())) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("Tên đã tồn tại");
        }
        return ResponseEntity.ok(service.add(chatLieu));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id,
                                    @RequestBody ChatLieu chatLieu) {
        if (!service.existingById(id)) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy cập nhật");
        }
        return ResponseEntity.ok(service.update(id, chatLieu));
    }

    @DeleteMapping("/id")
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
        if (!service.existingById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy xóa");
        }
        return ResponseEntity.ok(service.deleteById(id));
    }

}
