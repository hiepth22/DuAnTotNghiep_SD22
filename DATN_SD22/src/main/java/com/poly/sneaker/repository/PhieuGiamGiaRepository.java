package com.poly.sneaker.repository;

import com.poly.sneaker.entity.PhieuGiamGia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhieuGiamGiaRepository extends JpaRepository<PhieuGiamGia, Long> {
List<PhieuGiamGia> findByTen(String ten);

}
