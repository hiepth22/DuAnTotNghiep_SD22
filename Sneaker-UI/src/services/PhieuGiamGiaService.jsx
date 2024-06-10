import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/phieu-giam-gia'; 

class PhieuGiamGiaService {
  // Hiển thị
  static getAll = async () => {
    try {
      const response = await axios.get(`${API_URL}/phieu-giam-gia`);
      return response.data;
    } catch (error) {
      console.error('Error fetching vouchers:', error);
      return [];
    }
  };

  // Chi tiết
  static getById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/phieu-giam-gia/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching voucher:', error);
      return null;
    }
  };

  // Thêm mới
  static add = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/phieu-giam-gia`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating voucher:', error);
      return null;
    }
  };

  // Sửa
  static update = async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/phieu-giam-gia/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating voucher:', error);
      return null;
    }
  };

  // Xóa
  static delete = async (id) => {
    try {
      await axios.delete(`${API_URL}/phieu-giam-gia/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting voucher:', error);
      return false;
    }
  };
}

export default PhieuGiamGiaService;