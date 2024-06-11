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

    static addSPChiTietToHDChiTiet = async (idHoaDon, idSanPham, giaBan) => {
        try {
            const hoaDonChiTietRequest = {
                sanPhamChiTiet: {
                    id: idSanPham,
                },
                soLuong: 1,
                gia: giaBan,
                trangThai: 1,
            };

            const res = await request.post(
                `/ban-hang-tai-quay/add-to-cart/${idHoaDon}`,
                hoaDonChiTietRequest
            );
            return res.data;
        } catch (error) {
            console.error("Error updating hoa don chi tiet:", error);
            throw error;
        }
    };

    static updateTrangThaiHD(idHoaDon, trangThai) {
        try {
            const HoaDonRequest = {
                trangThai: 0,
            };
            return request.put("/hoa-don/update/${idHoaDon}", HoaDonRequest);
        } catch (error) {
            console.error("Error updating hoa don:", error);
            throw error;
        }
    }
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
