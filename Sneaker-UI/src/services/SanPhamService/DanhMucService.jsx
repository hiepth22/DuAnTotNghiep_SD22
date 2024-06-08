import request from "../Request";

class ChatLieuService {
  // Hiển thị
  static getAll = async () => {
    let response = await request.get(`danh-muc`);
    return response.data;
  };

  // Chi tiết
  static getById = async (id) => {
    let response = await request.get(id);
    return response.data;
  };

  // Thêm mới
  static add(data) {
    return request.post("http://localhost:8080/danh-muc", data);
  }

  // Sửa
  static update(id, data) {
    return request.put("danh-muc/" + id, data);
  }

  // Xóa
  static delete(id) {
    return request.delete("danh-muc/" + id);
  }
}
