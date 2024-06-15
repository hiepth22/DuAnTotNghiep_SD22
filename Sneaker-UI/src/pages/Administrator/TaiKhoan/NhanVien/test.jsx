
import React, { useEffect, useState } from "react";
import { GetAllNhanvien, detailNhanvien, phantrangsevice, updatett } from "../../../../services/NhanVienSevice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form } from "antd";
import moment from "moment";

function NhanVienPage() {
    const [nhanviens, setNhanviens] = useState([]);
    const [NhanViendt, setSelectedNhanVienId] = useState(null);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const buildCloudinaryUrl = (publicId) => {
        const cloudName = "deapopcoc"; // Thay bằng tên cloud của bạn
        return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;
    };

    const lui = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const tien = () => {
        setCurrentPage(currentPage + 1);
    };

    const phantrang = (page) => {
        phantrangsevice(page)
            .then((response) => {
                if (response.data.length === 0) {
                    toast.error("Dữ liệu không có sẵn");
                } else {
                    setNhanviens(response.data);
                    setCurrentPage(page);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const openDetailModal = (id) => {
        detailNhanvien(id)
            .then((response) => {
                setSelectedNhanVienId(response.data);
                setShowModal(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        phantrang(currentPage);
    }, [currentPage]);

    const modalStyles = {
        modalHeader: {
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '15px',
            borderRadius: '5px 5px 0 0',
        },
        modalTitle: {
            marginBottom: '0',
        },
        modalBody: {
            padding: '20px',
        },
        modalBodyP: {
            margin: '5px 0',
        },
        modalFooter: {
            backgroundColor: '#f2f2f2',
            padding: '10px',
            textAlign: 'right',
            borderRadius: '0 0 5px 5px',
        },
        imgFluid: {
            maxWidth: '100%',
            height: 'auto',
        }
    };

    const GioiTinh = (gt) => {
        return gt ? "Nam" : "Nữ";
    };

    const Trangthai = (tt) => {
        return tt === 0 ? "Không Hoạt Động" : "Hoạt Động";
    };

    const vaitro = (vt) => {
        return vt === 0 ? "Nhân Viên" : "Quản Lí";
    };

   

    const addNhanVien = () => {
        navigate("/admin/nhanvien-add");
    };

    const updateNhanVien = (id) => {
        navigate(`/admin/nhanvien-add/${id}`);
    };

    
    const updatetrangthai = (id,ten) => {
        updatett(id);
        toast.success(`đã đổi trạng thái nhân viên : ${ten}`);
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }
    
    const closeModal = () => {
        setShowModal(false);
        setSelectedNhanVienId(null);
    };

    return (
        <div className="container mt-4">
            <div className="mt-4">
                <form className="d-flex flex-wrap justify-content-center">
                    <div className="cot1 col-lg-5 mr-lg-3 mb-3">
                        <div className="row justify-content-center mr-20px">
                            <div className="col-md-6 mb-3">
                                <div className="input-group d-flex align-items-center">
                                    <label className="mr-2">Tìm Kiếm:</label>
                                    <input
                                        type="search"
                                        className="form-control rounded"
                                        placeholder="Search"
                                        aria-label="Search"
                                        aria-describedby="search-addon"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="combo d-flex align-items-center">
                                    <label className="mr-2">Trạng Thái:</label>
                                    <select className="form-control">
                                        <option>tất cả</option>
                                        <option value="1">Hoạt Động</option>
                                        <option value="0">Không Hoạt Động</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cot1 col-lg-5 mb-3">
                        <div className="input-group mb-2 d-flex align-items-center">
                            <label className="mr-2">Ngày Sinh:</label>
                            <input
                                type="date"
                                className="form-control rounded"
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="search-addon"
                            />
                        </div>
                    </div>
                    <div className="w-100 d-flex justify-content-center mt-3">
                        <button type="button" className="btn btn-primary mr-2">
                            Tìm Kiếm
                        </button>
                        <button type="button" className="btn btn-secondary">
                            Làm Mới
                        </button>
                    </div>
                </form>
            </div>

            <h4 className="fs-3 p-3 mb-2 bg-success text-white">
                <i className="fa-solid fa-list"></i> Danh Sách Nhân Viên
            </h4>
            <br />
            <button className="btn btn-danger mb-3" onClick={addNhanVien}>
                + Thêm
            </button>
            <table className="table table-bg-gray text-center">
                <thead className="thead-dark">
                    <tr className="text-center">
                        <th scope="col">STT</th>
                        <th scope="col">Ảnh Đại Diện</th>
                        <th scope="col">Tên Nhân Viên</th>
                        <th scope="col">Mã Nhân Viên</th>
                        <th scope="col">Số Điện Thoại</th>
                        <th scope="col">Ngày Sinh</th>
                        <th scope="col">Giới Tính</th>
                        <th scope="col">Cccd</th>
                        <th scope="col">Vai Trò</th>
                        <th scope="col">Trạng Thái</th>
                        <th scope="col" className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {nhanviens.map((nhanvien, index) => (
                        <tr key={nhanvien.id}>
                            <td>{index + 1}</td>
                            <td >
                                <img
                                    src={buildCloudinaryUrl(nhanvien.anh)}
                                    style={{ width: 70, height: 70 }}
                                />
                            </td>
                            <td>{nhanvien.ten}</td>
                            <td>{nhanvien.ma}</td>
                            <td>{nhanvien.sdt}</td>
                            <td>{nhanvien.ngaySinh}</td>
                            <td>{GioiTinh(nhanvien.gioiTinh)}</td>
                            <td>{nhanvien.cccd}</td>
                            <td>{vaitro(nhanvien.vaiTro)}</td>
                            <td>{Trangthai(nhanvien.trangThai)}</td>
                            <td className="text-center">
                                <button
                                    className="btn btn-success"
                                    style={{ marginLeft: "8px" }}
                                    onClick={() => updateNhanVien(nhanvien.id)}
                                >
                                    <i className="fa-solid fa-pen"></i>
                                </button>
                                <button
                                    type="button"
                                    style={{ marginLeft: "8px" }}
                                    className="btn btn-warning"
                                    onClick={() =>  updatetrangthai(nhanvien.id,nhanvien.ten)}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                                <button
                                    type="primary"
                                    onClick={() =>openDetailModal(nhanvien.id)}
                                    style={{ marginLeft: "8px" }}
                                    className="btn btn-info"
                                >
                                    <i className="fa-solid fa-circle-info"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="text-center">
                <button type="button" className="btn btn-light" onClick={lui}>
                    <i className="fa-solid fa-angles-left"></i>
                </button>
                <span className="mx-2">Trang {currentPage + 1}</span>
                <button type="button" className="btn btn-light" onClick={tien}>
                    <i className="fa-solid fa-angles-right"></i>
                </button>
            </div>

            {NhanViendt && (
                <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header" style={modalStyles.modalHeader}>
                                <h5 className="modal-title" style={modalStyles.modalTitle}><i className="bi bi-eye-fill"></i> Chi Tiết Nhân Viên</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body" style={modalStyles.modalBody}>
                                <div className="row">
                                    <div className="col-4 text-center">
                                        <img src={buildCloudinaryUrl(NhanViendt.anh)} alt="Avatar" style={modalStyles.imgFluid} />
                                    
                                    </div>
                                    <div className="col-8">
                                        <p style={modalStyles.modalBodyP}><strong>Tên:</strong> {NhanViendt.ten}</p>
                                        <p style={modalStyles.modalBodyP}><strong>Mã Nhân Viên:</strong> {NhanViendt.ma}</p>
                                        <p style={modalStyles.modalBodyP}><strong>Số Điện Thoại:</strong> {NhanViendt.sdt}</p>
                                        <p style={modalStyles.modalBodyP}><strong>Ngày Sinh:</strong> {moment(NhanViendt.ngaySinh).format('YYYY-MM-DD')}</p>
                                        <p style={modalStyles.modalBodyP}><strong>Giới Tính:</strong> {GioiTinh(NhanViendt.gioiTinh)}</p>
                                        <p style={modalStyles.modalBodyP}><strong>CCCD:</strong> {NhanViendt.cccd}</p>
                                        <p style={modalStyles.modalBodyP}><strong>ngày Tạo:</strong> {NhanViendt.ngaytao}</p>
                                        <p style={modalStyles.modalBodyP}><strong>ngày Cập Nhập:</strong> {NhanViendt.ngaycapnhap}</p>
                                        <p style={modalStyles.modalBodyP}><strong>Mật Khẩu:</strong> {NhanViendt.matKhau}</p>
                                       
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer" style={modalStyles.modalFooter}>
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Thoát</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NhanVienPage;
