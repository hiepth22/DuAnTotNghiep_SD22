package com.poly.sneaker.repository;

import com.poly.sneaker.entity.NhanVien;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NhanVienRepository extends JpaRepository<NhanVien,Long> {
    List<NhanVien> findByTen(String ten);
    List<NhanVien> findByTrangThai(int tt);
    Page<NhanVien> findByTrangThai(int trangThai, Pageable pageable);
    List<NhanVien> findAll(Specification<NhanVien> spec);
}
