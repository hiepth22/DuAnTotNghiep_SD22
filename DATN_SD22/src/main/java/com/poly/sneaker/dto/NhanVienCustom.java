package com.poly.sneaker.dto;

import com.poly.sneaker.entity.NhanVien;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class NhanVienCustom extends NhanVien {
    private MultipartFile img;
}
