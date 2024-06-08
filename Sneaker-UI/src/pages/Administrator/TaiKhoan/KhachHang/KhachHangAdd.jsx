import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { add, update, detail } from '../../../../services/KhachHangService';
import { useNavigate, useParams } from 'react-router-dom';

const getDateNow = () => {
    return moment().format("YYYY-MM-DD");
};

export const convertDate = (date) => {
    return moment(date).format("YYYY-MM-DD");
};

const KhachHangAdd = () => {
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
    const [trangThai, setTrangThai] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setAnh(file);
        setPreview(URL.createObjectURL(file));
    };

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };

    const cancel = () => {
        navigate('/admin/khach-hang');
    };

    const renderHeader = () => {
        return id ? (
            <h1 className='text-center fs-3 p-3 mb-2 bg-success text-white'>Update Khách Hàng</h1>
        ) : (
            <h1 className='text-center fs-3 p-3 mb-2 bg-success text-white'>Thêm Khách Hàng</h1>
        );
    };

    useEffect(() => {
        if (id) {
            detail(id)
                .then((kh) => {
                    console.log("Data from API:", kh.data);
                    setAnh(kh.data.anh);
                    setTen(kh.data.ten);
                    setMa(kh.data.ma);
                    setSdt(kh.data.sdt);
                    setNgaySinh(convertDate(kh.data.ngaySinh)); // Chuyển đổi ngày sinh
                    setMail(kh.data.email);
                    setGioiTinh(kh.data.gioiTinh.toString()); // Chuyển đổi giới tính thành chuỗi
                    setCccd(kh.data.cccd);
                    setMatKhau(kh.data.matKhau);
                    setTrangThai(kh.data.trangThai.toString()); // Chuyển đổi trạng thái thành chuỗi
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);
    
    

    const saveKhachHang = async (nv) => {
        nv.preventDefault();
        const ngaytao = getDateNow();
        const ngaycapnhap = getDateNow();

        const khData = {
            // anh,
            ten,
            ma,
            sdt,
            ngaySinh,
            email,
            gioiTinh,
            cccd,
            matKhau,
            trangThai,
            ngaytao,
            ngaycapnhap,
            diachi,
        };
        console.log(khData)
        if (id) {
            try {
                update(id, khData).then((response) => {
                    toast.success('Thành công!!!');
                    navigate('/admin/khach-hang');
                    console.log(response.data)
                })
            } catch (error) {
                console.log(error);
                toast.warning('Thất bại!!');
            }
        } else {
            try {
                const response = await add(khData);
                console.log(response)
                toast.success('Thành công!');
                navigate('/admin/khach-hang');
            } catch (error) {
                console.error('Error:', error);
                toast.warning('Thất bại!!!');
            }
        }
    };

    return (
        <div className="container mt-4">
            {renderHeader()}
            <div className="row">
                <div className="col-md-4 d-flex justify-content-center align-items-center bg-body p-4">
                    <div>
                        <h1 className='text-center fs-3'>Ảnh Đại Diện</h1>
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
                                    position: 'relative',
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
                            <form onSubmit={saveKhachHang}>
                                <div className="row">
                                    <h2 className="text-center fs-3 card-body">Thông Tin Khách Hàng</h2>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label className="form-label">Tên Khách Hàng:</label>
                                            <input
                                                type="text"
                                                placeholder="Nhập tên Khách Hàng"
                                                name="ten"
                                                value={ten}
                                                className="form-control"
                                                onChange={(e) => setTen(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label">Mã Khách Hàng:</label>
                                            <input
                                                type="text"
                                                placeholder="Nhập mã Khách Hàng"
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
                                        <div className="form-group mb-3"></div>
                                        <div className="form-group mb-3">
                                            <label className="form-label">Trạng Thái:</label>
                                            <select
                                                className="form-select"
                                                aria-label="Trạng Thái"
                                                value={trangThai}
                                                onChange={(e) => setTrangThai(e.target.value)}
                                            >
                                                <option value="">Chọn Trạng Thái</option>
                                                <option value="1">Hoạt động</option>
                                                <option value="0">Ngưng hoạt động</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center mt-3">
                                    <button type="submit" className="btn btn-primary">
                                        Lưu
                                    </button>
                                    <button type="button" className="btn btn-success" onClick={cancel}>
                                        Hủy
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KhachHangAdd;
