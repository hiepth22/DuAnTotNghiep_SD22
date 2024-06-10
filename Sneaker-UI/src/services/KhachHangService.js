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
