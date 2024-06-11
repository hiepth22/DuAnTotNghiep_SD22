import React from 'react';

const PhieuGiamGiaItem = ({ phieuGiamGia, handleEdit, handleDelete }) => {
  return (
    <tr>
      <td>{phieuGiamGia.ma}</td>
      <td>{phieuGiamGia.ten}</td>
      <td>{phieuGiamGia.soLuong}</td>
      <td>{phieuGiamGia.hinhThucGiam}</td>
      <td>{phieuGiamGia.giaTriGiam}</td>
      <td>{phieuGiamGia.dieuKienGiam}</td>
      <td>{phieuGiamGia.ngayBatDau}</td>
      <td>{phieuGiamGia.ngayKetThuc}</td>
      <td>{phieuGiamGia.ngayTao}</td> 
      <td>{phieuGiamGia.ngayCapNhat}</td> 
      <td>{phieuGiamGia.nguoiTao}</td> 
      <td>{phieuGiamGia.nguoiCapNhat}</td> 
      <td>{phieuGiamGia.isActive ? 'Đang hoạt động' : 'Ngừng hoạt động'}</td>
      <td>
        <button onClick={() => handleEdit(phieuGiamGia)}>Sửa</button>
        <button onClick={() => handleDelete(phieuGiamGia.id)}>Xóa</button>
      </td>
    </tr>
  );
};

export default PhieuGiamGiaItem;