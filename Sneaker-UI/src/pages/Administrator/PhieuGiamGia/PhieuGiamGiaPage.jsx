

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PhieuGiamGiaPage = () => {
  const [phieuGiamGiaList, setPhieuGiamGiaList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedPhieuGiamGia, setSelectedPhieuGiamGia] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/phieu-giam-gia`);
        setPhieuGiamGiaList(response.data);
      } catch (error) {
        console.error('Error fetching vouchers:', error);
      }
    };

    fetchData();
  }, []);
  const handleAddPhieuGiamGia = () => {
    setShowForm(true);
    setSelectedPhieuGiamGia(null);
  };

  const handleEditPhieuGiamGia = (phieuGiamGia) => {
    setShowForm(true);
    setSelectedPhieuGiamGia(phieuGiamGia);
  };
  const handleDeletePhieuGiamGia = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phiếu giảm giá này?')) {
      try {
        await axios.delete(`<span class="math-inline">\{API\_URL\}/phieu\-giam\-gia/</span>{id}`);
        const updatedList = phieuGiamGiaList.filter((phieu) => phieu.id !== id);
        setPhieuGiamGiaList(updatedList);
      } catch (error) {
        console.error('Error deleting voucher:', error);
      }
    }
  };
  // const handleSavePhieuGiamGia = (data) => {

  //   setShowForm(false);
  // };

  // const handleCancel = () => {
  //   setShowForm(false);
  // };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredPhieuGiamGiaList = phieuGiamGiaList.filter((phieu) => {
    return (
      phieu.ma.toLowerCase().includes(searchTerm) ||
      phieu.ten.toLowerCase().includes(searchTerm) ||
      phieu.dieuKienGiam.toLowerCase().includes(searchTerm)
    );
  });

  const renderPhieuGiamGiaList = () => {
    return (
      <div className="phieu-giam-gia-list">
        <input type="text" placeholder="Tìm kiếm..." onChange={handleSearch} />
        <table>
          <thead>
            <tr>
              <th>Mã</th>
              <th>Tên</th>
              <th>Số lượng </th>
              <th>Hình thức giảm</th>
              <th>Điều kiện giảm </th>
              <th>Giá trị giảm </th>
              <th> Giảm tối đa </th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Ngày tạo </th>
              <th>Ngày cập nhật </th>
              <th>Người tạo </th>
              <th>Người cập nhật </th>
              <th>Trạng thái </th>
              <th>Hành động</th>
            </tr>
          </thead>
          {filteredPhieuGiamGiaList &&<tbody>
            {filteredPhieuGiamGiaList.map((phieuGiamGia) => (
              <tr key={phieuGiamGia.id}>
                <td>{phieuGiamGia.ma}</td>
                <td>{phieuGiamGia.ten}</td>
                <td>{phieuGiamGia.hinhThucGiam}</td>
                <td>{phieuGiamGia.giaTriGiam}</td>
                <td>{phieuGiamGia.dieuKienGiam}</td>
                <td>{phieuGiamGia.ngayBatDau}</td>
                <td>{phieuGiamGia.ngayKetThuc}</td>
                <td>{phieuGiamGia.ngayTao} </td>
                <td>{phieuGiamGia.ngayCapNhat} </td>
                <td>{phieuGiamGia.nguoiTao} </td>
                <td>{phieuGiamGia.nguoiCapNhat} </td>
                <td>{phieuGiamGia.isActive ? 'Đang hoạt động' : 'Ngừng hoạt động'}</td>

                <td>
                  <button onClick={() => handleEditPhieuGiamGia(phieuGiamGia)}>Sửa</button>
                  <button onClick={() => handleDeletePhieuGiamGia(phieuGiamGia.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>}
        </table>
      </div>
    );
  };


  return (
    <div className="phieu-giam-gia-page">
      <h1>Quản lý phiếu giảm giá</h1>
      <button onClick={handleAddPhieuGiamGia}>Thêm phiếu giảm giá</button>
      {showForm && renderForm()}
      {renderPhieuGiamGiaList()}
    </div>
  );
};


export default PhieuGiamGiaPage;
