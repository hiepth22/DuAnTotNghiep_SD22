package com.poly.sneaker.controller;

import com.poly.sneaker.entity.KhachHang;
import com.poly.sneaker.service.KhachHangService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/khach-hang")
@CrossOrigin(origins = "*")
public class KhachHangController {

    @Autowired
    private KhachHangService service;

    @GetMapping("")
    public List<KhachHang> HienThi() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable(name = "id") Long id) {
        if (!service.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy id");
        }
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping("")
    public ResponseEntity<?> add(@RequestBody @Valid KhachHang kh, BindingResult rs) {
        if (rs.hasErrors()) {
            List<ObjectError> list = rs.getAllErrors();
            return ResponseEntity.ok(list);
        }
        if (service.existsByTen(kh.getTen())) {
            return ResponseEntity.ok("Tên đã tồn tại");
        }

        service.add(kh);
        return ResponseEntity.ok("Thành Công!!!");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
        if (!service.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy");
        }
        return ResponseEntity.ok(service.deleteById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody KhachHang nv) {
        if (!service.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy");
        }
        return ResponseEntity.ok(service.update(id, nv));
    }

    @GetMapping("/page")
    public Page<KhachHang> getKH(@RequestParam(defaultValue = "0") int page) {
        return service.phanTrang(page);
    }
}
