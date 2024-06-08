package com.poly.sneaker.controller;

import com.poly.sneaker.entity.NhanVien;
import com.poly.sneaker.repository.NhanVienRepository;
import com.poly.sneaker.service.NhanVienSevice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/nhan-vien")
@CrossOrigin("*")
public class NhanVienController {
    @Autowired
    private NhanVienSevice sevice;


    @GetMapping("")
    public List<NhanVien> HienThi() {
        List<NhanVien> lst = sevice.getall();
        return lst;
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable(name = "id") Long id) {
        if (!sevice.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    "Không tìm thấy id"
            );
        }
        return ResponseEntity.ok(sevice.findById(id));
    }

    @PostMapping("")
    public ResponseEntity<?> add(@RequestBody @Valid NhanVien nv, BindingResult rs) {
        if (rs.hasErrors()) {
            List<ObjectError> lst = rs.getAllErrors();
            return ResponseEntity.ok(lst);
        }
        if (sevice.existsByTen(nv.getTen())) {
            return ResponseEntity.ok("tên đã tồn tại");
        }

        sevice.Add(nv);
        return ResponseEntity.ok("thêm thành công");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
        if (!sevice.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    "Không tìm thấy id"
            );
        }
        return ResponseEntity.ok(sevice.deleteById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id
            , @RequestBody NhanVien nv) {
        if (!sevice.existsById(id)) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    "Không tìm thấy"
            );
        }
        return ResponseEntity.ok(sevice.update(id, nv));
    }
    @GetMapping ("page")
    public Page<NhanVien> getNhanViens(@RequestParam(defaultValue = "0") int page) {
        return sevice.phantrang(page);
    }
}
