package com.poly.sneaker.service;

import com.poly.sneaker.entity.ThuongHieu;
import com.poly.sneaker.repository.ThuongHieuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ThuongHieuService {
    @Autowired
    private ThuongHieuRepository repository;

    public List<ThuongHieu> getAll() {
        return repository.findAll();
    }

    public ThuongHieu add(ThuongHieu thuongHieu) {
        return repository.save(thuongHieu);
    }

    public ThuongHieu finById(Long id) {
        Optional<ThuongHieu> optional = repository.findById(id);
        return optional.map(o -> o).orElse(null);
    }

    public ThuongHieu deleteById(Long id) {
        Optional<ThuongHieu> optional = repository.findById(id);
        return optional.map(o -> {
            repository.delete(o);
            return o;
        }).orElse(null);
    }

    public ThuongHieu update(Long id, ThuongHieu newThuongHieu) {
        Optional<ThuongHieu> optional = repository.findById(id);
        return optional.map(o -> {
            o.setTen(newThuongHieu.getTen());
<<<<<<< HEAD
=======
//            o.setMoTa(newThuongHieu.getMoTa());
>>>>>>> 5830f688d247fbbc19e5b34fdcfa3763c0b37190
            o.setNgayTao(newThuongHieu.getNgayTao());
            o.setNgayCapNhat(newThuongHieu.getNgayCapNhat());
            o.setNguoiTao(newThuongHieu.getNguoiTao());
            o.setNguoiCapNhat(newThuongHieu.getNguoiCapNhat());
            o.setTrangThai(newThuongHieu.getTrangThai());

            return repository.save(o);
        }).orElse(null);
    }

    public ThuongHieu updateTrangThai(Long id) {
        Optional<ThuongHieu> optional = repository.findById(id);
        return optional.map(o -> {
            o.setTrangThai(0);
            return repository.save(o);
        }).orElse(null);
    }

    public Boolean existingById(Long id) {
        return repository.existsById(id);
    }

    public Boolean existingByTen(String ten) {
        return repository.findByTen(ten).size() > 0;
    }
}
