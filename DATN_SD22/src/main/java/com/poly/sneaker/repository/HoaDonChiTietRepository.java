package com.poly.sneaker.repository;

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


}
