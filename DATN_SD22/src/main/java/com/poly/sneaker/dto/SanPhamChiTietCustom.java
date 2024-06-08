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
public class SanPhamChiTietCustom {

    private Long id;
    private String tenAnh;
    private String tenSanPham;
    private BigDecimal giaBan;
    private Integer soLuong;
    private String tenKichCo;
    private String tenMauSac;
    private int trangThai;


}
