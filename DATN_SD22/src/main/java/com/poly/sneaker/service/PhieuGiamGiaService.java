package com.poly.sneaker.service;

import com.poly.sneaker.entity.NhanVien;
import com.poly.sneaker.entity.PhieuGiamGia;
import com.poly.sneaker.repository.NhanVienRepository;
import com.poly.sneaker.repository.PhieuGiamGiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PhieuGiamGiaService {
    @Autowired
    private PhieuGiamGiaRepository phieuGiamGiaRepository;

    public List<PhieuGiamGia> getall() {

        return phieuGiamGiaRepository.findAll();
    }public List<PhieuGiamGia> getall(int tt) {
        return phieuGiamGiaRepository.findByTrangThai(tt);
    }
    public Page<PhieuGiamGia> page(Pageable pageable,int tt) {
        return phieuGiamGiaRepository.findByTrangThai(tt,pageable);
    }

    public PhieuGiamGia Add(PhieuGiamGia Pgg) {
        return phieuGiamGiaRepository.save(Pgg);
    }

    public PhieuGiamGia deleteById(Long id) {
        Optional<PhieuGiamGia> optional = phieuGiamGiaRepository.findById(id);
        return optional.map(o -> {
            phieuGiamGiaRepository.delete(o);
            return o;
        }).orElse(null);
    }

    public PhieuGiamGia update(Long id, PhieuGiamGia newpgg) {
        Optional<PhieuGiamGia> optional = phieuGiamGiaRepository.findById(id);
        return optional.map(o -> {
            o.setMa(newpgg.getMa());
            o.setTen(newpgg.getTen());
            o.setSoLuong(newpgg.getSoLuong());
            o.setHinhThucGiam(newpgg.getHinhThucGiam());
            o.setDieuKienGiam(newpgg.getDieuKienGiam());
            o.setGiaTriGiam(newpgg.getGiaTriGiam());
            o.setGiamToiDa(newpgg.getGiamToiDa());
            o.setTongTien(newpgg.getTongTien());
            o.setNgayTao(newpgg.getNgayTao());
            o.setNgayCapNhat(java.time.LocalDateTime.now());
            o.setNguoiTao(newpgg.getNguoiTao());
            o.setNguoiCapNhat(newpgg.getNguoiCapNhat());
            o.setTrangThai(newpgg.getTrangThai());
            return phieuGiamGiaRepository.save(o);
        }).orElse(null);
    }
    public PhieuGiamGia updateTrangThai(Long id){
        Optional<PhieuGiamGia> optional = phieuGiamGiaRepository.findById(id);
        return optional.map(o -> {
            o.setTrangThai(0);
            return phieuGiamGiaRepository.save(o);
        }).orElse(null);
    }
    public Boolean existsById(Long id) {
        return phieuGiamGiaRepository.existsById(id);
    }
    public Boolean existsByTen(String ten) {
        return phieuGiamGiaRepository.findByTen(ten).size() > 0;
    }

    public Boolean trangthai(int tt) {
        return phieuGiamGiaRepository.findByTrangThai(tt).size() > 0;
    }
    public PhieuGiamGia findById(Long id) {
        Optional<PhieuGiamGia> optional = phieuGiamGiaRepository.findById(id);
        return optional.map(o -> o).orElse(null);
    }

}