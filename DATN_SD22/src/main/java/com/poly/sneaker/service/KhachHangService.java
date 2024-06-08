package com.poly.sneaker.service;

import com.poly.sneaker.entity.KhachHang;
import com.poly.sneaker.repository.KhachHangRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KhachHangService {

    private final KhachHangRepository khachHangRepository;

    @Autowired
    public KhachHangService(KhachHangRepository khachHangRepository) {
        this.khachHangRepository = khachHangRepository;
    }

    public List<KhachHang> getAll() {
        return khachHangRepository.findAll();
    }

    public Page<KhachHang> phanTrang(int page) {
        Pageable pageable = PageRequest.of(page, 10);
        return khachHangRepository.findAll(pageable);
    }

    public KhachHang add(KhachHang kh) {
        return khachHangRepository.save(kh);
    }

    public KhachHang deleteById(Long id) {
        Optional<KhachHang> optional = khachHangRepository.findById(id);
        return optional.map(o -> {
            khachHangRepository.delete(o);
            return o;
        }).orElse(null);
    }

    public KhachHang update(Long id, KhachHang kh) {
        Optional<KhachHang> optional = khachHangRepository.findById(id);
        return optional.map(o -> {
            o.setTen(kh.getTen());
            o.setMa(kh.getMa());
            o.setAnh(kh.getAnh());
            o.setCccd(kh.getCccd());
            o.setEmail(kh.getEmail());
            o.setGioiTinh(kh.getGioiTinh());
            o.setMatKhau(kh.getMatKhau());
            o.setNgaySinh(kh.getNgaySinh());
            o.setSdt(kh.getSdt());
            o.setTrangThai(kh.getTrangThai());
            return khachHangRepository.save(o);
        }).orElse(null);
    }

    public Boolean existsById(Long id) {
        return khachHangRepository.existsById(id);
    }

    public Boolean existsByTen(String ten) {
        return khachHangRepository.findByTen(ten).size() > 0;
    }

    public KhachHang findById(Long id) {
        Optional<KhachHang> optional = khachHangRepository.findById(id);
        return optional.orElse(null);
    }
}
