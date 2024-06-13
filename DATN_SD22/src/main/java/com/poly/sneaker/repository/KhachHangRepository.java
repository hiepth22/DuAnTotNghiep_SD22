package com.poly.sneaker.repository;

import com.poly.sneaker.entity.KhachHang;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KhachHangRepository extends JpaRepository<KhachHang,Long> {
    List<KhachHang> findByTen(String ten);
    List<KhachHang> findByTrangThai(int tt);
    Page<KhachHang> findByTrangThai(int tt, Pageable pageable);
}
