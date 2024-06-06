package com.poly.sneaker.repository;

import com.poly.sneaker.entity.KhachHang;
import com.poly.sneaker.entity.NhanVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KhachHangRepository extends JpaRepository<KhachHang,Integer> {
    List<KhachHang> findByTen(String ten);
}
