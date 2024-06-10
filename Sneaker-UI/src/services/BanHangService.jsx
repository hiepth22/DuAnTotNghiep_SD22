import { useQuery } from "@tanstack/react-query";
import request from "./Request";
import axios from "axios";

class BanHangService {
    static add(data) {
        return request.post("/hoa-don/add", data);
    }

    static add2(data) {
        return request.post("/hoa-don-chi-tiet/add", data);
    }

    static updateHoaDonChiTiet = async (idHoaDon, idSanPham, giaBan) => {
        try {
            const hoaDonChiTietRequest = {
                idChiTietSanPham: idSanPham,
                donGia: giaBan,
                soLuong: 1,
                trangThai: 1, // Mặc định số lượng là 1
            };

            console.log("Request data:", hoaDonChiTietRequest);

            const res = await request.put(
                `/ban-hang-tai-quay/update/${idHoaDon}`,
                hoaDonChiTietRequest
            );

            console.log("Response data:", res.data);
            return res.data;
        } catch (error) {
            console.error("Error updating hoa don chi tiet:", error);
            throw error; // Re-throw the error for handling in the component
        }
    };
}

export default BanHangService;

export const hoaDonData = () => {
    return useQuery({
        queryKey: ["hoaDonData"],
        queryFn: async () => {
            const res = await request.get(`/hoa-don`);
            return res.data;
        },
    });
};

export const hoaDonChiTietDataByIdHD = (id) => {
    return useQuery({
        queryKey: ["hoaDonCTData", id],
        queryFn: async () => {
            const res = await request.get(`/hoa-don-chi-tiet/${id}`);
            return res.data;
        },
    });
};

export const sanPhamCTData = () => {
    return useQuery({
        queryKey: ["SPCTData"],
        queryFn: async () => {
            const res = await request.get(
                `/ban-hang-tai-quay/san-pham-chi-tiet`
            );
            return res.data;
        },
    });
};
