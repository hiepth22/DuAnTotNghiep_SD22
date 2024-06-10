import request from "../Request";

class ThuongHieuService {
  // Hiển thị
  static getAll = async () => {
    let response = await request.get(`thuong-hieu`);
    return response.data;
  };

  // Chi tiết
  static getById = async (id) => {
    let response = await request.get(id);
    return response.data;
  };

  // Thêm mới
  static add(data) {
    return request.post("http://localhost:8080/thuong-hieu", data);
  }

  // Sửa
  static update(id, data) {
    return request.put("thuong-hieu/" + id, data);
  }

  // Xóa
  static delete(id) {
    return request.delete("thuong-hieu/" + id);
  }
}

export default ThuongHieuService;
