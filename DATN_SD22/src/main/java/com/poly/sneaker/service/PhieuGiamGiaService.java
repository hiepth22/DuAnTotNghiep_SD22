package com.poly.sneaker.service;

import com.poly.sneaker.entity.PhieuGiamGia;
import com.poly.sneaker.repository.PhieuGiamGiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PhieuGiamGiaService {

    @Autowired
    private PhieuGiamGiaRepository phieuGiamGiaRepository;

    public List<PhieuGiamGia> getAll() {
        return phieuGiamGiaRepository.findAll();
    }

    public PhieuGiamGia add(PhieuGiamGia phieuGiamGia) {
        return phieuGiamGiaRepository.save(phieuGiamGia);
    }

    public PhieuGiamGia finById(Long id) {
        Optional<PhieuGiamGia> optional = phieuGiamGiaRepository.findById(id);
        return optional.map(o -> o).orElse(null);
    }

    public PhieuGiamGia deleteById(Long id) {
        Optional<PhieuGiamGia> optional = phieuGiamGiaRepository.findById(id);
        return optional.map(o -> {
            phieuGiamGiaRepository.delete(o);
            return o;
        }).orElse(null);
    }

    public PhieuGiamGia update(Long id, PhieuGiamGia newPhieuGiamGia) {
        Optional<PhieuGiamGia> optional = phieuGiamGiaRepository.findById(id);
        return optional.map(o -> {
            o.setMa(newPhieuGiamGia.getMa());
            o.setTen(newPhieuGiamGia.getTen());
            o.setSoLuong(newPhieuGiamGia.getSoLuong());
            o.setHinhThucGiam(newPhieuGiamGia.getHinhThucGiam());
            o.setDieuKienGiam(newPhieuGiamGia.getDieuKienGiam());
            o.setGiaTriGiam(newPhieuGiamGia.getGiaTriGiam());
            o.setGiamToiDa(newPhieuGiamGia.getGiamToiDa());
            o.setTongTien(newPhieuGiamGia.getTongTien());
            o.setNgayTao(newPhieuGiamGia.getNgayTao());
            o.setNgayCapNhat(newPhieuGiamGia.getNgayCapNhat());
            o.setNguoiTao(newPhieuGiamGia.getNguoiTao());
            o.setNguoiCapNhat(newPhieuGiamGia.getNguoiCapNhat());
            o.setTrangThai(newPhieuGiamGia.getTrangThai());

            return phieuGiamGiaRepository.save(o);
        }).orElse(null);
    }

    public PhieuGiamGia updateTrangThai(Long id) {
        Optional<PhieuGiamGia> optional = phieuGiamGiaRepository.findById(id);
        return optional.map(o -> {
            o.setTrangThai(0);
            return phieuGiamGiaRepository.save(o);
        }).orElse(null);
    }

    public Boolean existingById(Long id) {
        return phieuGiamGiaRepository.existsById(id);
    }

    public Boolean existingByTen(String ten) {
        return phieuGiamGiaRepository.findByTen(ten).size() > 0;
    }
}