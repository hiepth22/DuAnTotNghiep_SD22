import request from "../Request";

class NhaSanXuatService {
  // Hiển thị
  static getAll = async () => {
    let response = await request.get(`nha-san-xuat`);
    return response.data;
  };

  // Chi tiết
  static getById = async (id) => {
    let response = await request.get(id);
    return response.data;
  };

  // Thêm mới
  static add(data) {
    return request.post("http://localhost:8080/nha-san-xuat", data);
  }

  // Sửa
  static update(id, data) {
    return request.put("nha-san-xuat/" + id, data);
  }

  // Xóa
  static delete(id) {
    return request.delete("nha-san-xuat/" + id);
  }
}

export default NhaSanXuatService;
