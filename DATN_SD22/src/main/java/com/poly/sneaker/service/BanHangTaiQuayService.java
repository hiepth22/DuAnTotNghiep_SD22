package com.poly.sneaker.service;

import com.poly.sneaker.dto.HoaDonChiTietCustom;
import com.poly.sneaker.dto.SanPhamChiTietCustom;
import com.poly.sneaker.entity.SanPhamChiTiet;
import com.poly.sneaker.repository.SanPhamChiTietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BanHangTaiQuayService {

    @Autowired
    SanPhamChiTietRepository sanPhamChiTietRepository;

    public List<SanPhamChiTietCustom> getAllCTSP() {
        List<Object[]> results = sanPhamChiTietRepository.findBySanPhamCT();

        return results.stream().map(result -> {
            Long id = (Long) result[0];
            String url = (String) result[1];
            String tenSanPham = (String) result[2];
            BigDecimal gia = (BigDecimal) result[3];
            int soLuong = (int) result[4];
            String kichCo = (String) result[5];
            String mauSac = (String) result[6];
            int trangThai = (int) result[7];
            return new SanPhamChiTietCustom(id, url, tenSanPham, gia, soLuong, kichCo, mauSac, trangThai);
        }).collect(Collectors.toList());
    }



}
