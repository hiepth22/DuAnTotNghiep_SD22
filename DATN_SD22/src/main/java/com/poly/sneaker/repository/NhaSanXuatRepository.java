package com.poly.sneaker.repository;

import com.poly.sneaker.entity.NhaSanXuat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NhaSanXuatRepository extends JpaRepository<NhaSanXuat, Long> {
}
