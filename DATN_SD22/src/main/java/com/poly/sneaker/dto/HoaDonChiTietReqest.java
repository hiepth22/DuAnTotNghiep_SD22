package com.poly.sneaker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Repository
public class HoaDonChiTietReqest {

    private Long id;
    private Long idChiTietSanPham;
    private int soLuong;
    private BigDecimal donGia;
}
