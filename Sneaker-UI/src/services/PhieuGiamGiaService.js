// import axios from "axios";

// const API_BASE_URL = 'http://localhost:3000/phieu-giam-gia';

// //  lấy tất cả phiếu giảm giá
// const GetAllPhieugiamgia = async () => {
//   try {
//     const response = await axios.get(API_BASE_URL);
//     return response.data;
//   } catch (error) {
//     console.error('Lỗi khi lấy phiếu giảm giá:', error.response ? error.response.data : error.message);
//     throw error;
//   }
// };

// //  thêm phiếu giảm giá mới
// const add = async (phieuGiamGia) => {
//   try {
//     console.log("Gửi yêu cầu đến API với dữ liệu:", phieuGiamGia);
//     const response = await axios.post(API_BASE_URL, phieuGiamGia);
//     console.log("Phản hồi từ API:", response);
//     return response.data;
//   } catch (error) {
//     console.error('Lỗi khi thêm phiếu giảm giá:', error.response ? error.response.data : error.message);
//     throw error;
//   }
// };

// //  lấy chi tiết phiếu giảm giá theo ID
// const detail = async (id) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error('Lỗi khi lấy chi tiết phiếu giảm giá:', error.response ? error.response.data : error.message);
//     throw error;
//   }
// };

// //  cập nhật dữ liệu phiếu giảm giá
// const update = async (pggId, phieuGiamGia) => {
//   try {
//     const response = await axios.put(`${API_BASE_URL}/${pggId}`, phieuGiamGia);
//     return response.data;
//   } catch (error) {
//     console.error('Lỗi khi cập nhật khách hàng:', error.response ? error.response.data : error.message);
//     throw error;
//   }
// };

// //  lấy phiếu giảm giá theo trang
// const phantrangservice = async (page) => {
//   try {
//     const response = await axios.get(API_BASE_URL + '/page?page=' + page);
//     return response.data;
//   } catch (error) {
//     console.error('Lỗi khi lấy phiếu giảm giá theo trang:', error.response ? error.response.data : error.message);
//     throw error;
//   }
// };

// // tìm kiếm phiếu giảm giá theo từ khóa
// const search = async (keyword) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/search?keyword=${keyword}`);
//     return response.data;
//   } catch (error) {
//     console.error('Lỗi khi tìm kiếm phiếu giảm giá:', error.response ? error.response.data : error.message);
//     throw error;
//   }
// };

// // xóa phiếu giảm giá
// const deletePGG = async (id) => {
//   try {
//     const response = await axios.delete(`${API_BASE_URL}/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error('Lỗi khi xóa phiếu giảm giá:', error.response ? error.response.data : error.message);
//     throw error;
//   }
// };

// export {
//   GetAllPhieugiamgia,
//   add,
//   detail,
//   update,
//   phantrangservice,
//   search,
//   deletePGG,
// };
import axios from "axios";

const API_BASE_URL = 'http://localhost:3000/phieu-giam-gia';

export const GetAllPhieugiamgia = () => axios.get(API_BASE_URL);

export const add = async (phieuGiamGia) => {
    try {
        console.log("Sending request to API with data:", phieuGiamGia);
        const response = await axios.post(API_BASE_URL, phieuGiamGia);
        console.log("Response from API:", response);
        return response.data;
    } catch (error) {
        console.error('Error adding data:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const detail =  (id,phieuGiamGia) => axios.get(API_BASE_URL+'/'+id,phieuGiamGia);

export const update = async (pggId, phieuGiamGia) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${pggId}`, phieuGiamGia);
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error.response ? error.response.data : error.message);
        throw error;
    
    }
};
export const phantrangservice = (page) => axios.get(API_BASE_URL + '/page?page=' + page);
export const search = async (keyword) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/search?keyword=${keyword}`);
        return response.data;
    } catch (error) {
        console.error('Error searching data:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const deletePGG = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error.response ? error.response.data : error.message);
        throw error;
    }
};