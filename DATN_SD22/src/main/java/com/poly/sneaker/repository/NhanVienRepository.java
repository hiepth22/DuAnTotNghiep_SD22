package com.poly.sneaker.repository;

import com.poly.sneaker.entity.NhanVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NhanVienRepository extends JpaRepository<NhanVien,Long> {
    List<NhanVien> findByTen(String ten);
    List<NhanVien> findByTrangThai(int tt);
}
