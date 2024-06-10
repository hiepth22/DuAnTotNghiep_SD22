import request from "../Request";

class CoGiayService {
  // Hiển thị
  static getAll = async () => {
    let response = await request.get(`co-giay`);
    return response.data;
  };

  // Chi tiết
  static getById = async (id) => {
    let response = await request.get(id);
    return response.data;
  };

  // Thêm mới
  static add(data) {
    return request.post("http://localhost:8080/co-giay", data);
  }

  // Sửa
  static update(id, data) {
    return request.put("co-giay/" + id, data);
  }

  // Xóa
  static delete(id) {
    return request.delete("co-giay/" + id);
  }
}

export default CoGiayService;
