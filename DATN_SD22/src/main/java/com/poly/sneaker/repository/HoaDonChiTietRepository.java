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

    @Query(value = "SELECT hdct.id, a.ten, sp.ten, kc.ten AS tenKichCo, ms.ten AS tenMauSac, hdct.soLuong, hdct.gia, hdct.trangThai " +
            "FROM dbo.hoa_don_chi_tiet hdct " +
            "LEFT JOIN dbo.hoa_don hd ON hd.id = hdct.idHoaDon " +
            "LEFT JOIN dbo.san_pham_chi_tiet spct ON hdct.idSanPhamChiTiet = spct.id " +
            "LEFT JOIN dbo.anh a ON spct.idAnh = a.id " +
            "LEFT JOIN dbo.kich_co kc ON spct.idKichCo = kc.id " +
            "LEFT JOIN dbo.mau_sac ms ON spct.idMauSac = ms.id " +
            "LEFT JOIN dbo.san_pham sp ON spct.idSanPham = sp.id " +
            "WHERE hd.id = :idHoaDon", nativeQuery = true)
    List<Object[]> findByHoaDonId(@Param("idHoaDon") Long idHoaDon);


    @Query(value = "select idHoaDon from hoa_don_chi_tiet where idSanPhamChiTiet =: idSanPhamChiTiet", nativeQuery = true)
    Long findBySanPhamCTId(@Param("idSanPhamChiTiet") Long idSanPhamChiTiet);

}
