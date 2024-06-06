package com.poly.sneaker.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Table(name = "nhan_vien")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class NhanVien {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "ten", length = 30)
    private String ten;

    @Column(name = "ma", length = 30)
    private String ma;

    @Column(name = "sdt", length = 30)
    private String sdt;

    @Column(name = "ngaySinh")
    private Date ngaySinh;

    @Column(name = "email", length = 50)
    private String email;

    @Column(name = "gioiTinh")
    private Boolean gioiTinh;

    @Column(name = "cccd", length = 30)
    private String cccd;

    @Column(name = "anh", length = 100)
    private String anh;

    @Column(name = "matKhau", length = 30)
    private String matKhau;

    @Column(name = "vai_tro")
    private Integer vaiTro;

    @Column(name = "trangThai")
    private Integer trangThai;
}
