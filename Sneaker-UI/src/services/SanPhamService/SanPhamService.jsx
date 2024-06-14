import request from "../Request";

class SanPhamService {
  // Hiển thị
  static getAll = async () => {
    let response = await request.get(`san-pham`);
    return response.data;
  };

  // Chi tiết
  static getById = async (id) => {
    let response = await request.get(id);
    return response.data;
  };

  // Thêm mới
  static add(data) {
    return request.post("san-pham", data);
  }

  // Sửa
  static update(id, data) {
    return request.put("san-pham/" + id, data);
  }

  // Xóa
  static delete(id) {
    return request.delete("san-pham/" + id);
  }
}

export default SanPhamService;
