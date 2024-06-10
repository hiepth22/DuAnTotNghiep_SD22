package com.poly.sneaker.repository;

import com.poly.sneaker.dto.HoaDonChiTietCustom;
import com.poly.sneaker.entity.HoaDonChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HoaDonChiTietRepository extends JpaRepository<HoaDonChiTiet, Long> {

    @Query(value = "SELECT hdct.id, a.url, sp.ten, kc.ten AS kich_co, ms.ten AS mau_sac, spct.soLuong, spct.giaBan, spct.trangThai\n" +
            "FROM dbo.hoa_don_chi_tiet hdct\n" +
            "INNER JOIN dbo.anh a ON a.id = hdct.id\n" +
            "INNER JOIN dbo.san_pham_chi_tiet spct ON hdct.idSanPhamChiTiet = spct.id\n" +
            "INNER JOIN dbo.kich_co kc ON spct.idKichCo = kc.id\n" +
            "INNER JOIN dbo.mau_sac ms ON spct.idMauSac = ms.id\n" +
            "INNER JOIN dbo.san_pham sp ON spct.idSanPham = sp.id\n" +
            "where hdct.idHoaDon = :idHoaDon", nativeQuery = true)
    List<Object[]> findByHoaDonId(@Param("idHoaDon") Long idHoaDon);

//
//    @Query(value = "SELECT new com.poly.sneaker.dto.HoaDonChiTietCustom(hdct.id, a.url, sp.ten, kc.ten, ms.ten, spct.soLuong, spct.giaBan) " +
//            "FROM HoaDonChiTiet hdct " +
//            "JOIN Anh a ON a.id = hdct.id " +
//            "JOIN SanPhamChiTiet spct ON hdct.idSanPhamChiTiet = spct.id " +
//            "JOIN KichCo kc ON spct.idKichCo = kc.id " +
//            "JOIN MauSac ms ON spct.idMauSac = ms.id " +
//            "JOIN SanPham sp ON spct.idSanPham = sp.id " +
//            "WHERE hdct.idHoaDon = :idHoaDon")
//    List<HoaDonChiTietCustom> findByHoaDonId(@Param("idHoaDon") Long idHoaDon);

}
