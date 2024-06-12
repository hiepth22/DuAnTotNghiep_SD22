package com.poly.sneaker.controller;

import com.poly.sneaker.entity.NhanVien;
import com.poly.sneaker.repository.NhanVienRepository;
import com.poly.sneaker.service.NhanVienSevice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/nhan-vien")
@CrossOrigin("*")
public class NhanVienController {
    @Autowired
    private NhanVienSevice sevice;
    private NhanVienRepository repo;



//    @GetMapping("")
//    public List<NhanVien> HienThi() {
//        List<NhanVien> lst = sevice.getall1(1);
//       return lst;
//    }
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
    @PutMapping("tt/{id}")
    public ResponseEntity<?> updateTT(@PathVariable("id") Long id
             ) {
        if (!sevice.existsById(id)) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    "Không tìm thấy"
            );
        }
        return ResponseEntity.ok(sevice.updateTrangThai(id));
    }
    @GetMapping("page")
    public ResponseEntity<?> page(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<NhanVien> nhanVienPage = sevice.page( pageable,1);

        List<NhanVien> lst = nhanVienPage.getContent()
                .stream()
                .sorted(Comparator.comparing(NhanVien::getNgaytao))
                .collect(Collectors.toList());
        return ResponseEntity.ok(lst);
    }
}
