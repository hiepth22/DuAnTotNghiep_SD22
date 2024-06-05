import axios from "axios";

const request = axios.create({
    baseURL: `http://localhost:8080/`,
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});

export default request;