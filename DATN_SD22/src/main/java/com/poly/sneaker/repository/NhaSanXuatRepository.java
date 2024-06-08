package com.poly.sneaker.repository;

import com.poly.sneaker.entity.NhaSanXuat;
import com.poly.sneaker.entity.NhanVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NhaSanXuatRepository extends JpaRepository<NhaSanXuat, Long>, JpaSpecificationExecutor<NhanVien> {

    List<NhaSanXuat> findByTen(String ten);
}
