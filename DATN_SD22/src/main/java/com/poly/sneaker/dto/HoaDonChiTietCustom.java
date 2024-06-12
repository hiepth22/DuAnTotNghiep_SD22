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
public class HoaDonChiTietCustom {

    private Long id;
    private String tenAnh;
    private String tenSanPham;
    private String kichCo;
    private String mauSac;
    private int soLuong;
    private BigDecimal gia;
}