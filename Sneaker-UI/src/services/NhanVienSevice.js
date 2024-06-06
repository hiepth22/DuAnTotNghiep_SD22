import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/nhan-vien';

export const GetAllThuongHieu =  () => axios.get(API_BASE_URL);
