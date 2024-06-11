import React, { useEffect, useState } from "react";
import moment from 'moment';
import { getAll, detail } from "../../../../services/KhachHangService";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function KhachHangPage() {
    const [khachHangs, setKH] = useState([]);
    const [selectedKH, setSelectedKH] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const nav = useNavigate();

    const gt = (gt) => {
        return gt ? "Nam" : "Nữ";
    };

    const trangThai = (tt) => {
        return tt ? "Hoạt Động" : "Ngưng Hoạt Động";
    };

    useEffect(() => {
        getAll()
            .then((response) => {
                setKH(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const addKH = () => {
        nav('/admin/khachhang-add');
    };

    const updateKH = (id) => {
        nav(`/admin/khachhang-add/${id}`);
    };

    const openDetailModal = (id) => {
        detail(id).then((response) => {
            setSelectedKH(response.data);
            setShowModal(true);
        }).catch((error) => {
            console.log(error);
        });
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedKH(null);
    };

    const modalStyles = {
        modalHeader: {
            backgroundColor: '#007bff',
            color: 'white'
        },
        modalTitle: {
            fontWeight: 'bold'
        },
        modalBody: {
            padding: '20px'
        },
        modalBodyP: {
            margin: '10px 0'
        },
        modalFooter: {
            padding: '10px'
        },
        imgThumbnail: {
            objectFit: 'cover',
            borderRadius: '50%'
        },
        imgFluid: {
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            objectFit: 'cover'
        }
    };

    return (
        <div className="container mt-4">
            <form className="d-flex">
                <div className="cot1">
                    <div className="input-group mb-2">
                        <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                        <button type="button" className="btn btn-outline-primary" data-mdb-ripple-init>Search</button>
                    </div>
                    <div className="combo mb-3">
                        {/* Additional filters can be added here */}
                    </div>
                </div>
            </form>
            <div className="h6">
                <h1 className=" p-3 mb-2 bg-secondary text-white" ><i className="fa-solid fa-list .bg-dark"></i> Danh Sách Khách Hàng </h1>
            </div>
            <br />
            <button className="btn btn-dark" onClick={addKH}><i class="bi bi-plus-square-fill"></i></button>
            <table className="table table-hover text-center">
                <thead className="thead-dark">
                    <tr className="text-center">
                        <th scope="col">STT</th>
                        <th scope="col">Ảnh</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Mã Khách Hàng</th>
                        <th scope="col">Số Điện Thoại</th>
                        <th scope="col">Ngày Sinh</th>
                        <th scope="col">Giới Tính</th>
                        <th scope="col">CCCD</th>
                        <th scope="col">Trạng Thái</th>
                        <th scope="col" className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {
                        khachHangs.map((khachHang, index) => (
                            <tr key={khachHang.id}>
                                <td>{index + 1}</td>
                                <td><img src={khachHang.anh} alt="Avatar" style={modalStyles.imgThumbnail} width="50" height="50" /></td>
                                <td>{khachHang.ten}</td>
                                <td>{khachHang.ma}</td>
                                <td>{khachHang.sdt}</td>
                                <td>{moment(khachHang.ngaySinh).format('YYYY-MM-DD')}</td>
                                <td>{gt(khachHang.gioiTinh)}</td>
                                <td>{khachHang.cccd}</td>
                                <td>{trangThai(khachHang.trangThai)}</td>
                                <td className="text-center">
                                    <button className="btn btn-success me-2" onClick={() => updateKH(khachHang.id)}><i className="fa-solid fa-pen"></i></button>
                                    <button type="button" className="btn btn-warning" onClick={() => openDetailModal(khachHang.id)}><i className="fa-solid fa-eye"></i></button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="text-center">
                <button type="button" className="btn btn-light me-2">
                    <i className="fa-solid fa-angles-left"></i>
                </button>
                <button type="button" className="btn btn-light">
                    <i className="fa-solid fa-angles-right"></i>
                </button>
            </div>

            {/* Modal */}
            {selectedKH && (
                <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header" style={modalStyles.modalHeader}>
                                <h5 className="modal-title" style={modalStyles.modalTitle}><i className="bi bi-eye-fill"></i> </h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body" style={modalStyles.modalBody}>
                                <div className="row">
                                    <div className="col-4 text-center">
                                        <img src={selectedKH.anh} alt="Avatar" style={modalStyles.imgFluid} />
                                    </div>
                                    <div className="col-8">
                                        <p style={modalStyles.modalBodyP}><strong>Tên:</strong> {selectedKH.ten}</p>
                                        <p style={modalStyles.modalBodyP}><strong>Mã Khách Hàng:</strong> {selectedKH.ma}</p>
                                        <p style={modalStyles.modalBodyP}><strong>Số Điện Thoại:</strong> {selectedKH.sdt}</p>
                                        <p style={modalStyles.modalBodyP}><strong>Ngày Sinh:</strong> {moment(selectedKH.ngaySinh).format('YYYY-MM-DD')}</p>
                                        <p style={modalStyles.modalBodyP}><strong>Giới Tính:</strong> {gt(selectedKH.gioiTinh)}</p>
                                        <p style={modalStyles.modalBodyP}><strong>CCCD:</strong> {selectedKH.cccd}</p>
                                        <p style={modalStyles.modalBodyP}><strong>Trạng Thái:</strong> {trangThai(selectedKH.trangThai)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer" style={modalStyles.modalFooter}>
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default KhachHangPage;
