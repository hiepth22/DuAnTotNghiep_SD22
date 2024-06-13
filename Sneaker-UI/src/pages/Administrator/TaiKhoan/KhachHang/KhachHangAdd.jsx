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
    const [anh, setAnh] = useState("");
    const [preview, setPreview] = useState(null);
    const [ten, setTen] = useState('');
    const [ma, setMa] = useState('');
    const [sdt, setSdt] = useState('');
    const [ngaySinh, setNgaySinh] = useState('');
    const [email, setMail] = useState('');
    const [gioiTinh, setGioiTinh] = useState('');
    const [cccd, setCccd] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [trangThai, setTrangThai] = useState('1'); // Trạng thái mặc định là 'Hoạt động'
    const [profileImage, setProfileImage] = useState("");
    const { id } = useParams();
    const [isloading, setItLoading] = useState(false);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file2 = e.target.files[0];
        setPreview(URL.createObjectURL(file2));
        setProfileImage(file2);
    };

    useEffect(() => {
        if (id) {
            detail(id)
                .then((kh) => {
                    console.log("Data from API:", kh.data);
                    setTen(kh.data.ten);
                    setMa(kh.data.ma);
                    setSdt(kh.data.sdt);
                    setNgaySinh(convertDate(kh.data.ngaySinh)); // Chuyển đổi ngày sinh
                    setMail(kh.data.email);
                    setGioiTinh(kh.data.gioiTinh.toString()); // Chuyển đổi giới tính thành chuỗi
                    setCccd(kh.data.cccd);
                    setMatKhau(kh.data.matKhau);
                    setTrangThai(kh.data.trangThai.toString()); // Chuyển đổi trạng thái thành chuỗi
                    setAnh(kh.data.anh); // Đặt ảnh từ API
                    setPreview(`https://res.cloudinary.com/deapopcoc/image/upload/${kh.data.anh}`); // Hiển thị ảnh
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    const cancel = () => {
        navigate('/admin/khach-hang');
    };

    const saveKhachHang = async (e) => {
        e.preventDefault();
        let publicId = "";
        setItLoading(true);
        try {
            if (profileImage &&
                (profileImage.type === "image/png" ||
                    profileImage.type === "image/jpg" ||
                    profileImage.type === "image/jpeg")
            ) {
                const img = new FormData();
                img.append("file", profileImage);
                img.append("cloud_name", "deapopcoc");
                img.append("upload_preset", "hwsotqf9");

                const response = await fetch(
                    "https://api.cloudinary.com/v1_1/deapopcoc/image/upload",
                    {
                        method: "POST",
                        body: img,
                    }
                );
                const imgData = await response.json();
                publicId = imgData.public_id;
                setPreview(null);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setItLoading(false);
        }

        const ngaytao = getDateNow();
        const ngaycapnhap = getDateNow();

        const khData = {
            anh: publicId || anh,
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
        };
        console.log(khData);
        if (id) {
            try {
                await update(id, khData);
                toast.success('Thành công!!!');
                navigate('/admin/khach-hang');
            } catch (error) {
                console.log(error);
                toast.warning('Thất bại!!');
            }
        } else {
            try {
                await add(khData);
                toast.success('Thành công!');
                navigate('/admin/khach-hang');
            } catch (error) {
                console.error('Error:', error);
                toast.warning('Thất bại!!!');
            }
        }
    };

    const triggerFileInput = () => {
        document.getElementById("fileInput").click();
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
                                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                                        <div>
                                            <h3 className='text-center'>Ảnh Đại Diện</h3>
                                            <div className="d-flex flex-column align-items-center">
                                                <div
                                                    className="image-placeholder rounded-circle mb-2"
                                                    onClick={triggerFileInput}
                                                    style={{
                                                        width: '150px',
                                                        height: '150px',
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
                                    <div className="col-md-8">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
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
                                                <div className="form-group">
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
                                                <div className="form-group">
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
                                                <div className="form-group">
                                                    <label className="form-label">Ngày Sinh:</label>
                                                    <input
                                                        type="date"
                                                        name="ngaySinh"
                                                        value={ngaySinh}
                                                        className="form-control"
                                                        onChange={(e) => setNgaySinh(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
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
                                                <div className="form-group">
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
                                                <div className="form-group">
                                                    <label className="form-label">CCCD:</label>
                                                    <input
                                                        type="text"
                                                        name="cccd"
                                                        value={cccd}
                                                        className="form-control"
                                                        onChange={(e) => setCccd(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Mật Khẩu:</label>
                                                    <input
                                                        type="password"
                                                        name="matKhau"
                                                        value={matKhau}
                                                        className="form-control"
                                                        onChange={(e) => setMatKhau(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Trạng Thái:</label>
                                                    <select
                                                        className="form-select"
                                                        aria-label="Trạng Thái"
                                                        value={trangThai}
                                                        disabled // Không cho người dùng chọn
                                                        onChange={(e) => setTrangThai(e.target.value)}
                                                    >
                                                        <option value="1">Hoạt động</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary me-2">
                                        Lưu
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
