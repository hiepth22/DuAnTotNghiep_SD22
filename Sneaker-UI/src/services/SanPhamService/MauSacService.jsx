import request from "../Request";

class MauSacService {
  // Hiển thị
  static getAll = async () => {
    let response = await request.get(`mau-sac`);
    return response.data;
  };

  // Chi tiết
  static getById = async (id) => {
    let response = await request.get(id);
    return response.data;
  };

  // Thêm mới
  static add(data) {
    return request.post("http://localhost:8080/mau-sac", data);
  }

  // Sửa
  static update(id, data) {
    return request.put("mau-sac/" + id, data);
  }

  // Xóa
  static delete(id) {
    return request.delete("mau-sac/" + id);
  }
}

export default MauSacService;
