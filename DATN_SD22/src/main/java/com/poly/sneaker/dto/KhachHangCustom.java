package com.poly.sneaker.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class KhachHangCustom {
    private MultipartFile img;
}
