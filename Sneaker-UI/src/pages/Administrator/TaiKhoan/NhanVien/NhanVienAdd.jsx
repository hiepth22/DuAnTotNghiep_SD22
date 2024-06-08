import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addNhanVien, detailNhanvien, updateNhanvien } from '../../../../services/NhanVienSevice';
import { useNavigate, useParams } from 'react-router-dom';
import { set } from 'date-fns';



const getDateNow = () => {
  return moment().format("YYYY-MM-DD HH:mm:ss");
};

export const convertDate = (date) => {
  return moment(date).format("YYYY-MM-DD");
};



const NhanVienAdd = () => {
  const [anh, setAnh] = useState('');
  const [preview, setPreview] = useState(null);
  const [ten, setTen] = useState('');
  const [ma, setMa] = useState('');
  const [sdt, setSdt] = useState('');
  const [ngaySinh, setNgaySinh] = useState('');
  const [email, setMail] = useState('');
  const [gioiTinh, setGioiTinh] = useState('');
  const [cccd, setCccd] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [vaiTro, setVaiTro] = useState('');
  const [trangThai, setTrangThai] = useState('');
  const [diachi, setdiachi] = useState('');

  const { id } = useParams();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAnh(file);
    setPreview(URL.createObjectURL(file));
  };
  const navigate = useNavigate();
  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };
  const Huy = () => {
    navigate('/admin/nhan-vien');
  };
  function check() {
    if (id) {
      return <h1 className='text-center fs-3 p-3 mb-2 bg-success text-white'>Update Nhân Viên</h1>
    }
    else {
      return <h1 className='text-center fs-3 p-3 mb-2 bg-success text-white'>Thêm Nhân Viên</h1>
    }
  }
  useEffect(()=>{
    if(id){
      detailNhanvien(id).then((nv) =>{
        setAnh(nv.data.anh);
        setTen(nv.data.ten);
        setMa(nv.data.ma);
        setSdt(nv.data.sdt);
        setNgaySinh(nv.data.ngaySinh);
        setMail(nv.data.email);
        setGioiTinh(nv.data.gioiTinh);
        setCccd(nv.data.cccd);
        setMatKhau(nv.data.matKhau);
        setVaiTro(nv.data.vaiTro);
        setTrangThai(nv.data.trangThai);
        setdiachi(nv.data.diachi)

      }).catch(error=>{
        console.log(error);
      })

      
    }
  },[id])

  const saveNhanVien = async (e) => {
   
    e.preventDefault();

    const ngaytao = getDateNow();
    const ngaycapnhap = getDateNow();



    const nhanVienData = {
      anh,
      ten,
      ma,
      sdt,
      ngaySinh,
      email,
      gioiTinh,
      cccd,
      matKhau,
      vaiTro,
      trangThai,
      ngaytao,
      ngaycapnhap,
      diachi,
    };

    console.log(nhanVienData);
    if(id){
      try {
      updateNhanvien(id,nhanVienData).then((response)=>{
        toast.success('Nhân viên được cập nhập thành công!');
        console.log(response.data)
        navigate('/admin/nhan-vien');
      })}catch (error ){
        console.log(error)
        toast.warning("update thất bại");
      };
       
    }
    else{
    try {
      const response = await addNhanVien(nhanVienData);
      console.log(response);
      navigate('/admin/nhan-vien');
      toast.success('Nhân viên được thêm thành công!');

    } catch (error) {
      console.error('Error:', error);
      toast.warning("Thêm thất bại");
    }}
  };

  return (
    <div className="container mt-4">
      {check()}
      <div className="row">
        <div className="col-md-4 d-flex justify-content-center align-items-center bg-body p-4">
          <div>
            <h1 className='text-center fs-3'>Ảnh Đại Diện</h1>
            <br /> <br /> <br />

            <div className="d-flex flex-column align-items-center">
              <div
                className="image-placeholder rounded-circle mb-2"
                onClick={triggerFileInput}
                style={{
                  width: '250px',
                  height: '250px',
                  backgroundColor: '#e9ecef',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                {preview ? (
                  <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '24px', color: '#6c757d' }}>+</span>
                )}
              </div>
              <input
                type="file"
                id="fileInput"
                name="anh"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-8 bg-light">
          <div className="card">
            <div className="card-body">
              <form onSubmit={saveNhanVien}>
                <div className="row">
                  <h2 className="text-center fs-3 card-body">Thông Tin Nhân Viên</h2>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">Tên Nhân Viên:</label>
                      <input
                        type="text"
                        placeholder="Nhập tên Nhân Viên"
                        name="ten"
                        value={ten}
                        className="form-control"
                        onChange={(e) => setTen(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">Mã Nhân Viên:</label>
                      <input
                        type="text"
                        placeholder="Nhập mã nhân viên"
                        name="ma"
                        value={ma}
                        className="form-control"
                        onChange={(e) => setMa(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">SĐT:</label>
                      <input
                        type="text"
                        placeholder="Nhập SĐT"
                        name="sdt"
                        value={sdt}
                        className="form-control"
                        onChange={(e) => setSdt(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">Ngày Sinh:</label>
                      <input
                        type="date"
                        name="ngaySinh"
                        value={ngaySinh}
                        className="form-control"
                        onChange={(e) => setNgaySinh(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">Email:</label>
                      <input
                        type="email"
                        placeholder="Nhập Email"
                        name="mail"
                        value={email}
                        className="form-control"
                        onChange={(e) => setMail(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">địa chỉ:</label>
                      <textarea
                        type="diachi"
                        placeholder="Nhập diachi"
                        name="diachi"
                        value={diachi}
                        className="form-control"
                        onChange={(e) => setdiachi(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">Giới Tính:</label>
                      <select
                        className="form-select"
                        name="gioiTinh"
                        value={gioiTinh}
                        onChange={(e) => setGioiTinh(e.target.value)}
                      >
                        <option value="">Chọn Giới Tính</option>
                        <option value="true">Nam</option>
                        <option value="false">Nữ</option>
                      </select>
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">CCCD:</label>
                      <input
                        type="text"
                        name="cccd"
                        value={cccd}
                        className="form-control"
                        onChange={(e) => setCccd(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">Mật Khẩu:</label>
                      <input
                        type="password"
                        name="matKhau"
                        value={matKhau}
                        className="form-control"
                        onChange={(e) => setMatKhau(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">Vai Trò:</label>
                      <select
                        className="form-select"
                        aria-label="Vai Trò"
                        value={vaiTro}
                        onChange={(e) => setVaiTro(e.target.value)}
                      >
                        <option value="">Chọn Vai Trò</option>
                        <option value="0">Nhân Viên</option>
                        <option value="1">Quản Lý</option>
                      </select>
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">Trạng Thái:</label>
                      <select
                        className="form-select"
                        aria-label="Trạng Thái"
                        value={trangThai}
                        onChange={(e) =>
                          setTrangThai(e.target.value)}
                      >
                        <option value="">Chọn Trạng Thái</option>
                        <option value="1">Hoạt động</option>
                        <option value="0">Không hoạt động</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-3">
                  <button type="submit" className="btn btn-primary">Save</button>
                  <button className="btn btn-success" onClick={Huy}>Hủy</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NhanVienAdd;
