import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/nhan-vien';

export const GetAllNhanvien =  () => axios.get(API_BASE_URL);
export const addNhanVien = async (nhanVien) => {
    try {
      console.log("Sending request to API with data:", nhanVien);
      const response = await axios.post(API_BASE_URL, nhanVien);
      console.log("Response from API:", response);
      return response.data;
    } catch (error) {
      console.error('Error adding data:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  export const detailNhanvien =  (nhanVienid,nhanVien) => axios.get(API_BASE_URL+'/'+nhanVienid,nhanVien);
  export const updateNhanvien=  (nhanVienid,nhanVien) => axios.put(API_BASE_URL+'/'+nhanVienid,nhanVien);
  export const updatett=  (nhanVienid) => axios.put(API_BASE_URL+'/tt/'+nhanVienid);
  export const phantrangsevice = (page) => axios.get(API_BASE_URL + '/page?page=' + page);
