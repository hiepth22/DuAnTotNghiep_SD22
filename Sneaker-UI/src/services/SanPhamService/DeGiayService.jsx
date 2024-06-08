import request from "../Request";

class ChatLieuService {
  // Hiển thị
  static getAll = async () => {
    let response = await request.get(`de-giay`);
    return response.data;
  };

  // Chi tiết
  static getById = async (id) => {
    let response = await request.get(id);
    return response.data;
  };

  // Thêm mới
  static add(data) {
    return request.post("http://localhost:8080/de-giay", data);
  }

  // Sửa
  static update(id, data) {
    return request.put("de-giay/" + id, data);
  }

  // Xóa
  static delete(id) {
    return request.delete("de-giay/" + id);
  }
}
