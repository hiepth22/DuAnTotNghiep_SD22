import axios from "axios";

const request = axios.create({
    baseURL: `http://localhost:3000/`,
<<<<<<< HEAD
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});
const nhanvien_api = axios.get({
    baseURL : 'http://localhost:3000/nhan-vien',
=======
>>>>>>> eb8fa7ec834de6e3f9f93f4d0fb413ab8ab5cee0
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});

export default request;
