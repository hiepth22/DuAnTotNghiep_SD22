import axios from "axios";

const API_BASE_URL = 'http://localhost:3000/khach-hang';

export const getAll = () => axios.get(API_BASE_URL);

export const add = async (khachHang) => {
    try {
        console.log("Sending request to API with data:", khachHang);
        const response = await axios.post(API_BASE_URL, khachHang);
        console.log("Response from API:", response);
        return response.data;
    } catch (error) {
        console.error('Error adding data:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const detail =  (id,khachHang) => axios.get(API_BASE_URL+'/'+id,khachHang);

export const update = async (khId, khachHang) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${khId}`, khachHang);
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error.response ? error.response.data : error.message);
        throw error;
    
    }
};
export const phantrangsevice = (page) => axios.get(API_BASE_URL + '/page?page=' + page);
export const search = async (keyword) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/search?keyword=${keyword}`);
        return response.data;
    } catch (error) {
        console.error('Error searching data:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const deleteKH = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error.response ? error.response.data : error.message);
        throw error;
    }
};