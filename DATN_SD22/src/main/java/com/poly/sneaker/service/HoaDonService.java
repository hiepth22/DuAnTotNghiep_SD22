package com.poly.sneaker.service;

import com.poly.sneaker.entity.HoaDon;
import com.poly.sneaker.entity.KhachHang;
import com.poly.sneaker.entity.NhanVien;
import com.poly.sneaker.repository.HoaDonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HoaDonService {
    @Autowired
    private HoaDonRepository hoaDonRepository;

//    @Autowired
//    private Nhanvienre nhanVienRepository;
//
//    @Autowired
//    private KhachHangRepository khachHangRepository;

    public HoaDon add(HoaDon hoaDon) {
//        NhanVien nhanVien = nhanVienRepository.findById(hoaDon.getNhanVien().getId()).orElse(null);
//        KhachHang khachHang = khachHangRepository.findById(hoaDon.getKhachHang().getId()).orElse(null);
//
//        hoaDon.setNgayTao(LocalDateTime.now());
//
//        hoaDon.setNhanVien(nhanVien);
//        hoaDon.setKhachHang(khachHang);

        return hoaDonRepository.save(hoaDon);
    }
}
