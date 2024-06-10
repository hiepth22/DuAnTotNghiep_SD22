import request from "../Request";

class KichCoService {
  // Hiển thị
  static getAll = async () => {
    let response = await request.get(`kich-co`);
    return response.data;
  };

  // Chi tiết
  static getById = async (id) => {
    let response = await request.get(id);
    return response.data;
  };

  // Thêm mới
  static add(data) {
    return request.post("http://localhost:8080/kich-co", data);
  }

  // Sửa
  static update(id, data) {
    return request.put("kich-co/" + id, data);
  }

  // Xóa
  static delete(id) {
    return request.delete("kich-co/" + id);
  }
}

export default KichCoService;
