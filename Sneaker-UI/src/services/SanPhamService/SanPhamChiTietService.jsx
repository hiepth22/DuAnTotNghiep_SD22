import request from "../Request";

class SanPhamChiTietService {
  static getAll = async () => {
    let res = await request.get(`san-pham-chi-tiet`);
    return res.data;
  };

  static findById = async (id) => {
    let res = await request.get(`san-pham-chi-tiet/` + id);
    return res.data;
  };

  static add(data) {
    return request.post("san-pham-chi-tiet", data);
  }

  static update(id, data) {
    return request.put("san-pham-chi-tiet/" + id, data);
  }

  static getAllBySP = async (idSP) => {
    let res = await request.get(`san-pham-chi-tiet/san-pham`, {
      params: {
        id: idSP,
      },
    });
    return res.data;
  };
}

export default SanPhamChiTietService;
