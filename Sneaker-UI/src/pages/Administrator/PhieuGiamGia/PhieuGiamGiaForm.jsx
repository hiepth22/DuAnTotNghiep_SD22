import React, { useState } from 'react';
import PhieuGiamGiaService from '.services/PhieuGiamGiaService';

const PhieuGiamGiaForm = ({ initialValues, onSubmit, handleCancel }) => {
  const [ma, setMa] = useState(initialValues.ma || '');
  const [ten, setTen] = useState(initialValues.ten || '');
  const [soLuong, setSoLuong] = useState(initialValues.soLuong || '');
  const [hinhThucGiam, setHinhThucGiam] = useState(initialValues.hinhThucGiam || '');
  const [giaTriGiam, setGiaTriGiam] = useState(initialValues.giaTriGiam || '');
  const [dieuKienGiam, setDieuKienGiam] = useState(initialValues.dieuKienGiam || '');
  const [ngayBatDau, setNgayBatDau] = useState(initialValues.ngayBatDau || '');
  const [ngayKetThuc, setNgayKetThuc] = useState(initialValues.ngayKetThuc || '');
  const [nguoiTao, setNguoiTao] = useState(initialValues.nguoiTao || '');
  const [nguoiCapNhat, setNguoiCapNhat] = useState(initialValues.nguoiCapNhat || '');

  const [isActive, setIsActive] = useState(initialValues.isActive || true);
  const [errors, setErrors] = useState({}); // Thêm trạng thái cho lỗi

  const handleSubmit = async (event) => {
    event.preventDefault();

    const voucherData = {
      ma,
      ten,
      soLuong,
      hinhThucGiam,
      giaTriGiam,
      dieuKienGiam,
      ngayBatDau,
      ngayKetThuc,
      nguoiTao,
      nguoiCapNhat,
      isActive,
    };

    try {
      // Tạo hoặc cập nhật phiếu giảm giá dựa trên `initialValues`
      if (initialValues) {
        await PhieuGiamGiaService.update(initialValues.id, voucherData);
      } else {
        await PhieuGiamGiaService.add(voucherData);
      }

      // Xóa lỗi và gửi thành công
      setErrors({});
      onSubmit(voucherData);
    } catch (error) {
      // Xử lý lỗi API và hiển thị chúng trong biểu mẫu
      const newErrors = {};
      if (error.response && error.response.data.errors) {
        newErrors = error.response.data.errors;
      } else {
        newErrors.general = 'Có lỗi xảy ra. Vui lòng thử lại.';
      }
      setErrors(newErrors);
    }
  };

  const handleCancel = () => {
    handleCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... Trường biểu mẫu và thông báo lỗi ... */}

      <button type="submit" className="btn btn-primary">Lưu</button>
      <button type="button" className="btn btn-secondary" onClick={handleCancel}>
        Hủy
      </button>
    </form>
  );
};

export default PhieuGiamGiaForm;