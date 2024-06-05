package com.poly.sneaker.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "khach_hang")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class KhachHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ten", length = 30)
    private String ten;

    @Column(name = "ma", length = 30)
    private String ma;

    @Column(name = "sdt", length = 30)
    private String sdt;

    @Column(name = "ngaySinh")
    private LocalDateTime ngaySinh;

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

    @Column(name = "trangThai")
    private Integer trangThai;

}
