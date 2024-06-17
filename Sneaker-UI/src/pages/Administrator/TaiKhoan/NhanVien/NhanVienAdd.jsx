import React, { useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    addNhanVien,
    detailNhanvien,
    updateNhanvien,
} from "../../../../services/NhanVienSevice";

import { useNavigate, useParams } from "react-router-dom";
;

const getDateNow = () => {
    return moment().format("YYYY-MM-DD HH:mm:ss");
};

export const convertDate = (date) => {
    return moment(date).format("YYYY-MM-DD");
};
const buildCloudinaryUrl = (publicId) => {
    const cloudName = "deapopcoc"; // Thay bằng tên cloud của bạn
    return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;
};
const NhanVienAdd = () => {
    const [anh, setAnh] = useState("");
    const [preview, setPreview] = useState(null);
    const [ten, setTen] = useState('');
    const [ma, setMa] = useState("");
    const [sdt, setSdt] = useState("");
    const [ngaySinh, setNgaySinh] = useState("");
    const [email, setMail] = useState("");
    const [gioiTinh, setGioiTinh] = useState("");
    const [cccd, setCccd] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [vaiTro, setVaiTro] = useState("");
    const [trangThai, setTrangThai] = useState("");
    const [diachi, setdiachi] = useState("");
    const [errors, setErrors] = useState({});

    const [profileImage, setProfileImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [isloading, setItLoading] = useState(false);

    const { id } = useParams();
    const handleImageChange = (e) => {
        const file2 = e.target.files[0];
        setPreview(URL.createObjectURL(file2));

        setProfileImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));

    };

    const uploadImage = async (e) => {
        e.preventDefault();
    };

    const navigate = useNavigate();
    const triggerFileInput = () => {
        document.getElementById("fileInput").click();
    };
    const Huy = () => {
        navigate("/admin/nhan-vien");
    };
    function check() {
        if (id) {
            return (
                <h1 className="text-center fs-3 p-3 mb-2 bg-success text-white">
                    Update Nhân Viên
                </h1>
            );
        } else {
            return (
                <h1 className="text-center fs-3 p-3 mb-2 bg-success text-white">
                    Thêm Nhân Viên
                </h1>
            );
        }
    }
    useEffect(() => {
        if (id) {
            detailNhanvien(id)
                .then((nv) => {
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
                    setdiachi(nv.data.diachi);

                    if (nv.data.anh) {
                        setPreview(buildCloudinaryUrl(nv.data.anh));
                        setProfileImage(nv.data.anh)
                   
                    }
                console.log(buildCloudinaryUrl(nv.data.anh));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);
    const validateData = () => {
        const newErrors = {};

        if (!ten.trim()) {
            newErrors.ten = "Tên không được để trống";
        }
        if (!ma.trim()) {
            newErrors.ma = "Mã không được để trống";
        }
        if (!sdt.trim()) {
            newErrors.sdt = "Số điện thoại không được để trống";
        } else if (!/^\d{10}$/.test(sdt)) {
            newErrors.sdt = "Số điện thoại phải có 10 chữ số.";
        }
        if (!ngaySinh) {
            newErrors.ngaySinh = "Ngày sinh không được để trống";
        }
        
        if (!email.trim()) {
            newErrors.email = "Email không được để trống";
        }
        if (gioiTinh === '') {
            newErrors.gioiTinh = "Giới tính không được để trống";
        }
        if (!cccd.trim()) {
            newErrors.cccd = "CCCD không được để trống";
        }
        if (!diachi.trim()) {
            newErrors.diachi = "Địa chỉ không được để trống";
        }
        // if (!vaiTro.trim()) {
        //     newErrors.vaiTro = "Vai trò không được để trống";
        // }
        // if (errors || !profileImage) {
        //     newErrors.anh = "vui lòng chọn ảnh";
        // }
        if (!matKhau.trim()) {
            newErrors.matKhau = "Mật khẩu không được để trống";
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(matKhau)) {
            newErrors.matKhau = "Mật khẩu phải bao gồm ít nhất 8 ký tự và ít nhất một chữ cái và một số.";
        }

        setErrors(newErrors);

        // Return errors if there are any, otherwise return null
        return Object.keys(newErrors).length > 0 ? newErrors : null;
    };

    const saveNhanVien = async (e) => {
        e.preventDefault();
        let publicID = "";
        const errors = validateData();
        if (errors) {
            return; // Nếu có lỗi thì không tiếp tục thực hiện lưu dữ liệu
        }
        if (errors || !profileImage) {

            return;
        }
        setItLoading(true);
        try {
            let imageURL;

            if (
                profileImage &&
                (profileImage.type === "image/png" ||
                    profileImage.type === "image/jpg" ||
                    profileImage.type === "image/jpeg")
            ) {
                const image = new FormData();
                image.append("file", profileImage);
                image.append("cloud_name", "deapopcoc");
                image.append("upload_preset", "hwsotqf9");

                const response = await fetch(
                    "https://api.cloudinary.com/v1_1/deapopcoc/image/upload",
                    {
                        method: "POST",
                        body: image,
                    }
                );
                const imgData = await response.json();
                imageURL = imgData.url.toString();
                setImagePreview(null);
                publicID = imgData.public_id;
            }

            // alert(imageURL);
        } catch (error) {
            console.log(error);
        } finally {
            setItLoading(false);
        }

        const ngaytao = getDateNow();
        const ngaycapnhap = getDateNow();
        const trangThai = 1;

        const nhanVienData = {
            anh: publicID || anh, // Sử dụng giá trị mới nếu có, nếu không sử dụng giá trị cũ
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
        if (id) {
            try {
                updateNhanvien(id, nhanVienData).then((response) => {
                    toast.success("Nhân viên được cập nhập thành công!");
                    console.log(response.data);
                    navigate("/admin/nhan-vien");
                });
            } catch (error) {
                console.log(error);
                toast.warning("update thất bại");
            }
        } else {
            try {


                const response = await addNhanVien(nhanVienData);
                console.log(response);
                navigate("/admin/nhan-vien");
                toast.success("Nhân viên được thêm thành công!");

            } catch (error) {
                console.error("Error:", error);
                toast.warning("Thêm thất bại");
            }
        }
    };


    return (
        <div className="container mt-4">
            {check()}
            <div className="row">
                <div className="col-md-4 d-flex justify-content-center align-items-center bg-body p-4">
                    <div>
                        {errors.anh && (
                            <div className="text-danger">{errors.anh}</div>
                        )}
                        <h1 className="text-center fs-3">Ảnh Đại Diện</h1>
                        <br />
                        <br /> <br />
                        <div className="d-flex flex-column align-items-center">
                            <div
                                className="image-placeholder rounded-circle mb-2"
                                onClick={triggerFileInput}
                                style={{
                                    width: "250px",
                                    height: "250px",
                                    backgroundColor: "#e9ecef",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    overflow: "hidden",
                                    position: "relative",
                                }}
                            >
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                ) : (
                                    <span
                                        style={{
                                            fontSize: "24px",
                                            color: "#6c757d",
                                        }}
                                    >
                                        +
                                    </span>
                                )}
                            </div>
                            <p>
                                <input
                                    type="file"
                                    id="fileInput"
                                    name="anh"
                                    className="form-control"
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={handleImageChange}
                                    style={{ display: "none" }}
                                />
                            </p>
                        </div>

                    </div>
                </div>

                <div className="col-md-8 bg-light">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={saveNhanVien}>
                                <div className="row">
                                    <h2 className="text-center fs-3 card-body">
                                        Thông Tin Nhân Viên
                                    </h2>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label className="form-label">
                                                Tên Nhân Viên:
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Nhập tên Nhân Viên"
                                                name="ten"
                                                value={ten}
                                                className={`form-control ${errors.ten ? 'is-invalid' : ''}`}
                                                onChange={(e) => setTen(e.target.value)}
                                            />
                                            {errors.ten && (
                                                <div className="text-danger">{errors.ten}</div>
                                            )}
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label">
                                                Mã Nhân Viên:
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Nhập mã nhân viên"
                                                name="ma"
                                                value={ma}
                                                className={`form-control ${errors.ma ? 'is-invalid' : ''}`}
                                                onChange={(e) => setMa(e.target.value)}
                                            />
                                            {errors.ma && (
                                                <div className="text-danger">{errors.ma}</div>
                                            )}
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label">
                                                SĐT:
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Nhập SĐT"
                                                name="sdt"
                                                value={sdt}
                                                className={`form-control ${errors.sdt ? 'is-invalid' : ''}`}
                                                onChange={(e) => setSdt(e.target.value)}
                                            />
                                            {errors.sdt && (
                                                <div className="text-danger">{errors.sdt}</div>
                                            )}
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label">
                                                Ngày Sinh:
                                            </label>
                                            <input
                                                type="date"
                                                name="ngaySinh"
                                                value={ngaySinh}
                                                className={`form-control ${errors.ngaySinh ? 'is-invalid' : ''}`}
                                                onChange={(e) => setNgaySinh(e.target.value)}
                                            />
                                            {errors.ngaySinh && (
                                                <div className="text-danger">{errors.ngaySinh}</div>
                                            )}
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label">
                                                Email:
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="Nhập Email"
                                                name="mail"
                                                value={email}
                                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                onChange={(e) => setMail(e.target.value)}
                                            />
                                            {errors.email && (
                                                <div className="text-danger">{errors.email}</div>
                                            )}
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label">
                                                Địa chỉ:
                                            </label>
                                            <textarea
                                                placeholder="Nhập địa chỉ"
                                                name="diachi"
                                                value={diachi}
                                                className={`form-control ${errors.diachi ? 'is-invalid' : ''}`}
                                                onChange={(e) => setdiachi(e.target.value)}
                                            />
                                            {errors.diachi && (
                                                <div className="text-danger">{errors.diachi}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label className="form-label">Giới Tính:</label><br />
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="gioiTinh"
                                                    id="nam"
                                                    value="true"
                                                    checked={gioiTinh === true}
                                                    onChange={(e) => setGioiTinh(true)}
                                                />
                                                <label className="form-check-label" htmlFor="nam">Nam</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="gioiTinh"
                                                    id="nu"
                                                    value="false"
                                                    checked={gioiTinh === false}
                                                    onChange={(e) => setGioiTinh(false)}
                                                />
                                                <label className="form-check-label" htmlFor="nu">Nữ</label>
                                            </div>
                                            {errors.gioiTinh && (
                                                <div className="text-danger">{errors.gioiTinh}</div>
                                            )}
                                        </div>

                                        <div className="form-group mb-3">
                                            <label className="form-label">
                                                CCCD:
                                            </label>
                                            <input
                                                type="text"
                                                name="cccd"
                                                value={cccd}
                                                className={`form-control ${errors.cccd ? 'is-invalid' : ''}`}
                                                onChange={(e) => setCccd(e.target.value)}
                                            />
                                            {errors.cccd && (
                                                <div className="text-danger">{errors.cccd}</div>
                                            )}
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label">
                                                Mật Khẩu:
                                            </label>
                                            <input
                                                type="password"
                                                name="matKhau"
                                                value={matKhau}
                                                className={`form-control ${errors.matKhau ? 'is-invalid' : ''}`}
                                                onChange={(e) => setMatKhau(e.target.value)}
                                            />
                                            {errors.matKhau && (
                                                <div className="text-danger">{errors.matKhau}</div>
                                            )}
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label">
                                                Vai Trò:
                                            </label>
                                            <select
                                                className={`form-select ${errors.vaiTro ? 'is-invalid' : ''}`}
                                                aria-label="Vai Trò"
                                                value={vaiTro}
                                                onChange={(e) => setVaiTro(e.target.value)}
                                            >
                                                <option value="">Chọn Vai Trò</option>
                                                <option value="1">Nhân Viên</option>
                                                <option value="2">Quản Lý</option>
                                            </select>
                                            {errors.vaiTro && (
                                                <div className="text-danger">{errors.vaiTro}</div>
                                            )}
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label">
                                                Trạng Thái:
                                            </label>
                                            <select
                                                className={`form-select ${errors.trangThai ? 'is-invalid' : ''}`}
                                                aria-label="Trạng Thái"
                                                value={trangThai}
                                                onChange={(e) => setTrangThai(e.target.value)}
                                            >
                                                <option value="1">Hoạt động</option>
                                                <option value="0">Không hoạt động</option>
                                            </select>
                                            {errors.trangThai && (
                                                <div className="text-danger">{errors.trangThai}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center mt-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="btn btn-success"
                                        onClick={Huy}
                                    >
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

export default NhanVienAdd;
