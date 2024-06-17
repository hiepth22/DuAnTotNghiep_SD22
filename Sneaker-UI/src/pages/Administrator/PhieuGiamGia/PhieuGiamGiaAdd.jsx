import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { add, update, detail } from '../../../services/PhieuGiamGiaService';
import { useNavigate, useParams } from 'react-router-dom';

const getDateNow = () => {
    return moment().format("YYYY-MM-DD");
};

export const convertDate = (date) => {
    return moment(date).format("YYYY-MM-DD");
};

const PhieuGiamGiaAdd = () => {
    const [ma, setMa] = useState('');
    const [ten, setTen] = useState('');
    const [soLuong, setSoLuong] = useState('');
    const [hinhThucGiam, setHinhThucGiam] = useState('');
    const [dieuKienGiam, setDieuKienGiam] = useState('');
    const [giamToiDa, setGiamToiDa] = useState('');
    const [giaTriGiam, setGiaTriGiam] = useState('');
    const [ngayBatDau, setNgayBatDau] = useState('');
    const [ngayKetThuc, setNgayKetThuc] = useState('');
    const [ngayTao, setNgayTao] = useState('');
    const [ngayCapNhat, setNgayCapNhat] = useState('');
    const [nguoiTao, setNguoiTao] = useState('');
    const [nguoiCapNhat, setNguoiCapNhat] = useState('');
    const [trangThai, setTrangThai] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            detail(id)
                .then((pgg) => {
                    console.log("Data from API:", pgg.data);
                    setMa(pgg.data.ma);
                    setTen(pgg.data.ten);
                    setSoLuong(pgg.data.soLuong);
                    setHinhThucGiam(pgg.data.hinhThucGiam.toString());
                    setDieuKienGiam(pgg.data.dieuKienGiam);
                    setGiamToiDa(pgg.data.giamToiDa);
                    setGiaTriGiam(pgg.data.giaTriGiam);
                    setNgayBatDau(convertDate(pgg.data.ngayBatDau));
                    setNgayKetThuc(convertDate(pgg.data.setNgayKetThuc));
                    setNgayTao(convertDate(pgg.data.ngayTao));
                    setNgayCapNhat(convertDate(pgg.data.setngayCapNhat));
                    setNguoiTao(pgg.data.nguoiTao);
                    setNguoiCapNhat(pgg.data.nguoiCapNhat);
                    setTrangThai(pgg.data.trangThai.toString());
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },);


    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };

    const cancel = () => {
        navigate('/admin/phieu-giam-gia');
    };

    const savePhieuGiamGia = async (p) => {
        p.preventDefault();
        const ngayTao = getDateNow();
        const ngayCapNhat = getDateNow();
        const ngayBatDau = getDateNow();
        const ngayKetThuc = getDateNow();

        const pggData = {
            ma,
            ten,
            soLuong,
            hinhThucGiam,
            dieuKienGiam,
            giamToiDa,
            giaTriGiam,
            ngayBatDau,
            ngayKetThuc,
            ngayTao,
            ngayCapNhat,
            nguoiTao,
            nguoiCapNhat,
        };

        if (id) {
            try {
                update(id, pggData).then((response) => {
                    toast.success('Cập Nhật Thành công!!!');
                    navigate('/admin/phieu-giam-gia');
                })
            } catch (error) {
                console.log(error);
                toast.warning(' Cập Nhật Thất bại!!');
            }
        } else {
            try {
                const response = await add(pggData);
                console.log(response)
                toast.success('Thêm Thành công!');
                navigate('/admin/phieu-giam-gia');
            } catch (error) {
                console.error('Error:', error);
                toast.warning('Thêm Thất bại!!!');
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="p-3 mb-2 bg-info text-dark rounded">
                            <h2>
                                <span className="h6">{id ? 'Cập Nhật Thông Tin Phiếu Giảm Giá' : 'Thêm Mới Phiếu Giảm Giá'}</span>
                            </h2>
                        </div>
                        <p></p>
                        <div className="card-body">
                            <form onSubmit={savePhieuGiamGia}>
                                <div className="row mb-3">
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">Mã Phiếu Giảm Giá:</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Nhập mã Phiếu Giảm Giá"
                                                        name="ma"
                                                        value={ma}
                                                        className="form-control"
                                                        onChange={(p) => setMa(p.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Tên Phiếu Giảm Giá:</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Nhập Tên Phiếu Giảm Giá"
                                                        name="ten"
                                                        value={ten}
                                                        className="form-control"
                                                        onChange={(p) => setTen(p.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Số Lượng:</label>
                                                    <input
                                                        type="number"
                                                        placeholder="Nhập số Lượng"
                                                        name="soLuong"
                                                        value={soLuong}
                                                        className="form-control"
                                                        onChange={(p) => setSoLuong(p.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Hình Thức Giảm:</label>
                                                    <select
                                                        className="form-select"
                                                        name="hinhThucGiam"
                                                        value={hinhThucGiam}
                                                        onChange={(p) => setHinhThucGiam(p.target.value)}
                                                    >
                                                        <option value="">Chọn Hình Thức Giảm</option>
                                                        <option value="true">Giảm theo %</option>
                                                        <option value="false">Giảm tiền </option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Điều Kiện Giảm :</label>
                                                    <input
                                                        type="number"
                                                        placeholder="Nhập điều kiện giảm"
                                                        name="dieuKienGiam"
                                                        value={dieuKienGiam}
                                                        className="form-control"
                                                        onChange={(p) => setDieuKienGiam(p.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label"> Giảm Tối Đa :</label>
                                                    <input
                                                        type="number"
                                                        placeholder="Nhập giảm tối đa"
                                                        name="giamToiDa"
                                                        value={giamToiDa}
                                                        className="form-control"
                                                        onChange={(p) => setGiamToiDa(p.target.value)}
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label"> Giá trị giảm :</label>
                                                    <input
                                                        type="number"
                                                        placeholder="Nhập giá trị giảm"
                                                        name="giaTriGiam"
                                                        value={giaTriGiam}
                                                        className="form-control"
                                                        onChange={(p) => setGiaTriGiam(p.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label"> Ngày Bắt Đầu :</label>
                                                    <input
                                                        type="date"
                                                        placeholder="Nhập ngày bắt đầu"
                                                        name="ngayBatDau"
                                                        value={ngayBatDau}
                                                        className="form-control"
                                                        onChange={(p) => setNgayBatDau(p.target.value)}
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label"> Ngày Kết Thúc:</label>
                                                    <input
                                                        type="date"
                                                        placeholder="Nhập ngày kết thúc"
                                                        name="ngayKetThuc"
                                                        value={ngayKetThuc}
                                                        className="form-control"
                                                        onChange={(p) => setNgayKetThuc(p.target.value)}
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label"> Ngày Tạo :</label>
                                                    <input
                                                        type="date"
                                                        placeholder="Nhập ngày tạo"
                                                        name="ngayTao"
                                                        value={ngayTao}
                                                        className="form-control"
                                                        onChange={(p) => setNgayTao(p.target.value)}
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label"> Ngày Cập Nhật :</label>
                                                    <input
                                                        type="date"
                                                        placeholder="Nhập ngày cập nhật"
                                                        name="ngayCapNhat"
                                                        value={ngayCapNhat}
                                                        className="form-control"
                                                        onChange={(p) => setNgayCapNhat(p.target.value)}
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label"> Người Tạo :</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Nhập người tạo"
                                                        name="nguoiTao"
                                                        value={nguoiTao}
                                                        className="form-control"
                                                        onChange={(p) => setNguoiTao(p.target.value)}
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label"> Người Cập Nhật :</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Nhập người cập nhật"
                                                        name="nguoiCapNhat"
                                                        value={nguoiCapNhat}
                                                        className="form-control"
                                                        onChange={(p) => setNguoiCapNhat(p.target.value)}
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label">Trạng Thái:</label>
                                                    <select
                                                        className="form-select"
                                                        aria-label="Trạng Thái"
                                                        value={trangThai}
                                                        onChange={(p) => setTrangThai(p.target.value)}
                                                    >
                                                        <option value="1">Hoạt động</option>
                                                        <option value="0"> Ngừng Hoạt động</option>
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

export default PhieuGiamGiaAdd;
