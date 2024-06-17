
import axios from "axios";

const API_BASE_URL = 'http://localhost:3000/phieu-giam-gia';

export const GetAllPhieugiamgia = () => axios.get(API_BASE_URL);

export const add = async (phieuGiamGia) => {
    try {
        console.log("Sending request to API with data:", phieuGiamGia);
        const response = await axios.post(API_BASE_URL, phieuGiamGia);
        console.log("Response from API:", response);
        return response.data;
    } catch (error) {
        console.error('Error adding data:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const detail = (pggId, phieuGiamGia) => axios.get(API_BASE_URL + '/' + pggId, phieuGiamGia);

export const update = async (pggId, phieuGiamGia) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${pggId}`, phieuGiamGia);
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error.response ? error.response.data : error.message);
        throw error;

    }
};
export const phantrangservice = (page) => axios.get(API_BASE_URL + '/page?page=' + page);
export const search = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error searching data:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const deletePGG = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error.response ? error.response.data : error.message);
        throw error;
    }
};