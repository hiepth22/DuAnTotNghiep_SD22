import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { add, update, detail } from '../../../../services/KhachHangService';
import { useNavigate, useParams } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const KhachHangAdd = () => {
    const [ten, setTen] = useState('');
    const [ma, setMa] = useState('');
    const [sdt, setSdt] = useState('');
    const [ngaySinh, setNgaySinh] = useState('');
    const [email, setEmail] = useState('');
    const [gioiTinh, setGioiTinh] = useState(true);
    const [cccd, setCccd] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [trangThai, setTrangThai] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (id) {
            detail(id)
                .then((kh) => {
                    setTen(kh.data.ten);
                    setMa(kh.data.ma);
                    setSdt(kh.data.sdt);
                    setNgaySinh(formatDate(kh.data.ngaySinh));
                    setEmail(kh.data.email);
                    setGioiTinh(kh.data.gioiTinh);
                    setCccd(kh.data.cccd);
                    setMatKhau(kh.data.matKhau);
                    setTrangThai(kh.data.trangThai);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    const cancel = () => {
        navigate('/admin/khach-hang');
    };

    const validateData = () => {
        const errors = {};

        if (!ten.trim()) {
            errors.ten = "Tên không được để trống";
        }
        if (!ma.trim()) {
            errors.ma = "Mã không được để trống";
        }
        if (!sdt.trim()) {
            errors.sdt = "Số điện thoại không được để trống";
        } else if (!/^\d{10}$/.test(sdt)) {
            errors.sdt = "Số điện thoại phải có 10 chữ số.";
        }
        if (!ngaySinh) {
            errors.ngaySinh = "Ngày sinh không được để trống";
        }
        if (!email.trim()) {
            errors.email = "Email không được để trống";
        }
        if (gioiTinh === '') {
            errors.gioiTinh = "Giới tính không được để trống";
        }
        if (!cccd.trim()) {
            errors.cccd = "CCCD không được để trống";
        }
        if (!matKhau.trim()) {
            errors.matKhau = "Mật khẩu không được để trống";
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(matKhau)) {
            errors.matKhau = "Mật khẩu phải bao gồm ít nhất 8 ký tự và ít nhất một chữ cái và một số.";
        }

        // Cập nhật state errors với các lỗi mới
        setErrors(errors);

        // Trả về errors nếu có lỗi, ngược lại trả về null
        return Object.keys(errors).length > 0 ? errors : null;
    };

    const saveKhachHang = async (e) => {
        e.preventDefault();

        const errors = validateData();
        if (errors) {
            return; // Nếu có lỗi thì không tiếp tục thực hiện lưu dữ liệu
        }

        setIsLoading(true);

        const ngayTao = new Date().toISOString();
        const ngayCapNhap = new Date().toISOString();

        const khachHangData = {
            ten,
            ma,
            sdt,
            ngaySinh,
            email,
            gioiTinh,
            cccd,
            matKhau,
            trangThai,
            ngayTao,
            ngayCapNhap,
        };

        try {
            if (id) {
                await update(id, khachHangData);
                toast.success('Cập nhật thành công!');
                navigate('/admin/khach-hang');
            } else {
                await add(khachHangData);
                toast.success('Thêm mới thành công!');
                navigate('/admin/khach-hang');
            }
        } catch (error) {
            console.error('Error saving data:', error);
            toast.error('Đã xảy ra lỗi khi lưu dữ liệu.');
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Hàm chuyển đổi định dạng ngày tháng từ API sang 'yyyy-MM-dd'
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toISOString().split('T')[0]; // Lấy ra 'yyyy-MM-dd' từ ISO string
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="p-3 mb-2 bg-info text-dark rounded">
                            <h2>
                                <span className="h6">{id ? 'Cập Nhật Thông Tin Khách Hàng' : 'Thêm Mới Khách Hàng'}</span>
                            </h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveKhachHang}>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label">Tên Khách Hàng:</label>
                                            <input
                                                type="text"
                                                placeholder="Nhập tên Khách Hàng"
                                                name="ten"
                                                value={ten}
                                                className={`form-control ${errors.ten ? 'is-invalid' : ''}`}
                                                onChange={(e) => setTen(e.target.value)}
                                            />
                                            {errors.ten && <div className="invalid-feedback">{errors.ten}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Mã Khách Hàng:</label>
                                            <input
                                                type="text"
                                                placeholder="Nhập mã Khách Hàng"
                                                name="ma"
                                                value={ma}
                                                className={`form-control ${errors.ma ? 'is-invalid' : ''}`}
                                                onChange={(e) => setMa(e.target.value)}
                                            />
                                            {errors.ma && <div className="invalid-feedback">{errors.ma}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">SĐT:</label>
                                            <input
                                                type="text"
                                                placeholder="Nhập SĐT"
                                                name="sdt"
                                                value={sdt}
                                                className={`form-control ${errors.sdt ? 'is-invalid' : ''}`}
                                                onChange={(e) => setSdt(e.target.value)}
                                            />
                                            {errors.sdt && <div className="invalid-feedback">{errors.sdt}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Ngày Sinh:</label>
                                            <input
                                                type="date"
                                                name="ngaySinh"
                                                value={ngaySinh}
                                                className={`form-control ${errors.ngaySinh ? 'is-invalid' : ''}`}
                                                onChange={(e) => setNgaySinh(e.target.value)}
                                            />
                                            {errors.ngaySinh && <div className="invalid-feedback">{errors.ngaySinh}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Email:</label>
                                            <input
                                                type="email"
                                                placeholder="Nhập Email"
                                                name="email"
                                                value={email}
                                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">

                                        <div className="form-group">
                                            <label className="form-label">Giới Tính:</label>
                                            <div>
                                                <label className="form-check-label">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        name="gioiTinh"
                                                        value="true"
                                                        checked={gioiTinh === true}
                                                        onChange={() => setGioiTinh(true)}
                                                    />
                                                    Nam
                                                </label>
                                                <label className="form-check-label">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        name="gioiTinh"
                                                        value="false"
                                                        checked={gioiTinh === false}
                                                        onChange={() => setGioiTinh(false)}
                                                    />
                                                    Nữ
                                                </label>
                                            </div>
                                            {errors.gioiTinh && <div className="invalid-feedback">{errors.gioiTinh}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">CCCD:</label>
                                            <input
                                                type="text"
                                                name="cccd"
                                                value={cccd}
                                                className={`form-control ${errors.cccd ? 'is-invalid' : ''}`}
                                                onChange={(e) => setCccd(e.target.value)}
                                            />
                                            {errors.cccd && <div className="invalid-feedback">{errors.cccd}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Mật Khẩu:</label>
                                            <div className="input-group">
                                                <input
                                                     type={showPassword ? 'text' : 'password'}
                                                    name="matKhau"
                                                    value={matKhau}
                                                    className={`form-control ${errors.matKhau ? 'is-invalid' : ''}`}
                                                    onChange={(e) => setMatKhau(e.target.value)}
                                                />
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    onClick={togglePasswordVisibility}
                                                >
                                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                                </button>
                                                {errors.matKhau && <div className="invalid-feedback">{errors.matKhau}</div>}
                                                
                                            </div>
                                            {errors.matKhau && <div className="invalid-feedback">{errors.matKhau}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Trạng Thái:</label>
                                            <select
                                                className="form-select"
                                                aria-label="Trạng Thái"
                                                value={trangThai}
                                                disabled
                                                onChange={(e) => setTrangThai(e.target.value)}
                                            >
                                                <option value="1">Hoạt động</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary me-2" disabled={isLoading}>
                                        {isLoading ? 'Đang lưu...' : 'Lưu'}
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={cancel}>
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
