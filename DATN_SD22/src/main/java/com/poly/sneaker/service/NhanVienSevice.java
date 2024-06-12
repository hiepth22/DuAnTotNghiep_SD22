package com.poly.sneaker.service;

import com.poly.sneaker.entity.NhanVien;
import com.poly.sneaker.repository.NhanVienRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NhanVienSevice {
    @Autowired
    private NhanVienRepository nhanVienRepository;

    public List<NhanVien> getall() {

        return nhanVienRepository.findAll();
    }public List<NhanVien> getall1(int tt) {
        return nhanVienRepository.findByTrangThai(tt);
    }
    public Page<NhanVien> page(Pageable pageable,int tt) {


        return nhanVienRepository.findByTrangThai(tt,pageable);
    }
<<<<<<< HEAD

=======
    public List<NhanVien> search(String text) {
        Specification<NhanVien> specification = (root, query, criteriaBuilder) -> {
            Predicate likeTen = criteriaBuilder.like(root.get("ten"),"%"+text+"%");
            Predicate likesdt = criteriaBuilder.like(root.get("sdt"),"%"+text+"%");

            return  criteriaBuilder.or(likeTen,likesdt);
        };
        return nhanVienRepository.findAll(specification);
    }
>>>>>>> 5980dc5d58a5b09f20c36a81514226b2a5f3a9d4
    public NhanVien Add(NhanVien Nv) {
        return nhanVienRepository.save(Nv);
    }

    public NhanVien deleteById(Long id) {
        Optional<NhanVien> optional = nhanVienRepository.findById(id);
        return optional.map(o -> {
            nhanVienRepository.delete(o);
            return o;
        }).orElse(null);
    }

    public NhanVien update(Long id, NhanVien newnv) {
        Optional<NhanVien> optional = nhanVienRepository.findById(id);
        return optional.map(o -> {
            o.setTen(newnv.getTen());
            o.setMa(newnv.getMa());
            o.setAnh(newnv.getAnh());
            o.setCccd(newnv.getCccd());
            o.setEmail(newnv.getEmail());
            o.setGioiTinh(newnv.getGioiTinh());
            o.setDiachi(newnv.getDiachi());
            o.setMatKhau(newnv.getMatKhau());
            o.setNgaySinh(newnv.getNgaySinh());
            o.setSdt(newnv.getSdt());
            o.setTrangThai(newnv.getTrangThai());
            o.setVaiTro(newnv.getVaiTro());
            o.setNgaycapnhap(java.time.LocalDateTime.now());
            return nhanVienRepository.save(o);
        }).orElse(null);
    }
    public NhanVien updateTrangThai(Long id){
        Optional<NhanVien> optional = nhanVienRepository.findById(id);
        return optional.map(o -> {
            //
            o.setTrangThai(0);

            return nhanVienRepository.save(o);
        }).orElse(null);
    }

    public Boolean existsById(Long id) {
        return nhanVienRepository.existsById(id);
    }

    public Boolean existsByTen(String tt) {
        return nhanVienRepository.findByTen(tt).size() > 0;
    }
    public Boolean trangthai(int tt) {
        return nhanVienRepository.findByTrangThai(tt).size() > 0;
    }
    public NhanVien findById(Long id) {
        Optional<NhanVien> optional = nhanVienRepository.findById(id);
        return optional.map(o -> o).orElse(null);
    }
}
