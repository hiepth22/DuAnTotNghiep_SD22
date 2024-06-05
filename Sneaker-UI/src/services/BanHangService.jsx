import {
    useQuery
} from '@tanstack/react-query';
import request from "./Request";
import axios from "axios";

class BanHangService {

    static add(data) {
        return request.post("/hoa-don/add", data);
    }

    static add2(data) {
        return request.post("/hoa-don-chi-tiet/add", data);
    }
}

export default BanHangService;


export const hoaDonData = () => {
    return useQuery({
        queryKey: ['hoaDonData'], 
        queryFn: async () => {
            const res = await request.get(`/hoa-don`);
            return res.data;
        }
    });

}

export const hoaDonChiTietDataByIdHD = (id) => {
    return useQuery({
        queryKey: ['hoaDonCTData', id], 
        queryFn: async () => {
            const res = await request.get(`/hoa-don-chi-tiet/${id}`);
            return res.data;
        }
    });
}


