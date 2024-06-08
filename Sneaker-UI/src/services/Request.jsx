import axios from "axios";

const request = axios.create({
    baseURL: `http://localhost:3000/`,
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});
const nhanvien_api = axios.get({
    baseURL : 'http://localhost:3000/nhan-vien',
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});

export default request;