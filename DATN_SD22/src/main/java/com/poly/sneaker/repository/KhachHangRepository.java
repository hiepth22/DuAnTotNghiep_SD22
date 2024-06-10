package com.poly.sneaker.repository;

import com.poly.sneaker.entity.KhachHang;
import org.hibernate.query.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface KhachHangRepository extends JpaRepository<KhachHang,Long> {
    List<KhachHang> findByTen(String ten);
}
