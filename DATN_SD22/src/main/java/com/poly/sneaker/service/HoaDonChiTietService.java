package com.poly.sneaker.service;

import com.poly.sneaker.dto.HoaDonChiTietCustom;
import com.poly.sneaker.dto.HoaDonChiTietReqest;
import com.poly.sneaker.entity.HoaDonChiTiet;
import com.poly.sneaker.entity.SanPhamChiTiet;
import com.poly.sneaker.repository.HoaDonChiTietRepository;
import com.poly.sneaker.repository.SanPhamChiTietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HoaDonChiTietService {
    @Autowired
    private HoaDonChiTietRepository hoaDonChiTietRepository;

    @Autowired
    private SanPhamChiTietRepository sanPhamChiTietRepository;

    public HoaDonChiTiet addHoaDonChiTiet (HoaDonChiTiet hoaDonChiTiet) {
        return hoaDonChiTietRepository.save(hoaDonChiTiet);
    }

    public List<HoaDonChiTietCustom> getAllByHoaDonId(Long hoaDonId) {
        List<Object[]> results = hoaDonChiTietRepository.findByHoaDonId(hoaDonId);

        return results.stream().map(result -> {
            Long id = (Long) result[0];
            String url = (String) result[1];
            String tenSanPham = (String) result[2];
            String kichCo = (String) result[3];
            String mauSac = (String) result[4];
            int soLuong = (int) result[5];
            BigDecimal gia = (BigDecimal) result[6];
            return new HoaDonChiTietCustom(id, url, tenSanPham, kichCo, mauSac, soLuong, gia);
        }).collect(Collectors.toList());
    }


    public HoaDonChiTiet updateSanPham(HoaDonChiTietReqest hdct, Long id) {
        Optional<HoaDonChiTiet> optional = hoaDonChiTietRepository.findById(id);
        Optional<SanPhamChiTiet> optional1 = sanPhamChiTietRepository.findById(hdct.getIdChiTietSanPham());

        HoaDonChiTiet hoaDonChiTiet = optional.get();
        SanPhamChiTiet sanPhamChiTiet = optional1.get();

        hoaDonChiTiet.setSoLuong(hdct.getSoLuong());
        hoaDonChiTiet.setGia(hdct.getDonGia());
        hoaDonChiTiet.setSanPhamChiTiet(sanPhamChiTiet);

        return hoaDonChiTietRepository.save(hoaDonChiTiet);
    }
}
