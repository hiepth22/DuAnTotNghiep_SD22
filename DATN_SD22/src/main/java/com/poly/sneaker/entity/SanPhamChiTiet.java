package com.poly.sneaker.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@Entity
@Table(name = "san_pham_chi_tiet")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder

public class SanPhamChiTiet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ma;

    private String barcode;

    private Integer soLuong;

    private BigDecimal giaBan;

    private String moTa;

    private Integer trangThai;

    @ManyToOne
    @JoinColumn(name = "idKichCo", referencedColumnName = "id")
    private KichCo kichCo;

    @ManyToOne
    @JoinColumn(name = "idMauSac", referencedColumnName = "id")
    private MauSac mauSac;

    @ManyToOne
    @JoinColumn(name = "idDeGiay", referencedColumnName = "id")
    private DeGiay deGiay;

    @ManyToOne
    @JoinColumn(name = "idChatLieu", referencedColumnName = "id")
    private ChatLieu chatLieu;

    @ManyToOne
    @JoinColumn(name = "idSanPham", referencedColumnName = "id")
    private SanPham sanPham;

    @ManyToOne
    @JoinColumn(name = "idCoGiay", referencedColumnName = "id")
    private CoGiay coGiay;

    @ManyToOne
    @JoinColumn(name = "idNhaSanXuat", referencedColumnName = "id")
    private NhaSanXuat nhaSanXuat;

    @ManyToOne
    @JoinColumn(name = "idAnh", referencedColumnName = "id")
    private Anh anh;

    @ManyToOne
    @JoinColumn(name = "idDanhMuc", referencedColumnName = "id")
    private DanhMuc danhMuc;
}
