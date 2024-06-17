import React, { useEffect, useState } from "react";
import moment from 'moment';
import { GetAllPhieugiamgia, detail, phantrangservice, deletePGG } from '../../../services/PhieuGiamGiaService';

import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function PhieuGiamGiaPage() {
    const [phieuGiamGias, setPGG] = useState([]);
    const [selectedPGG, setSelectedPGG] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [originalData, setOriginalData] = useState([]);
    const nav = useNavigate();
    const pageSize = 5;

    const hinhThucGiam = (htg) => {
        return htg ? "Giảm theo %" : "Giảm tiền";
    };

    const trangThai = (tt) => {
        return (
            <span className={tt ? 'status-active' : 'status-inactive'}>
                {tt ? "Hoạt Động" : "Ngưng Hoạt Động"}
            </span>
        );
    };


    const fetchAndSaveOriginalData = async () => {
        try {
            const response = await GetAllPhieugiamgia();
            setOriginalData(response.data);
            setPGG(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAndSaveOriginalData();
    }, []);

    const addPGG = () => {
        nav('/admin/phieugiamgia-add');
    };

    const updatePGG = (id) => {
        nav(`/admin/phieugiamgia-add/${id}`);
    };
    const openDetailModal = (id) => {
        detail(id).then((response) => {
            setSelectedPGG(response.data);
            setShowModal(true);
        }).catch((error) => {
            console.log(error);
        });
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedPGG(null);
    };

    const prev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const next = () => {
        setCurrentPage(currentPage + 1);
    };

    useEffect(() => {
        phantrangservice(currentPage)
            .then((response) => {
                if (response.data.length === 0) {
                    console.error('Dữ liệu không có sẵn');
                } else {
                    setPGG(response.data);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    },
    );



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
    return (
        <div className="container mt-4">
            <style>
                {`
                    .status-active {
                        background-color: green;
                        color: white;
                        padding: 5px;
                        border-radius: 5px;
                    }
                    .status-inactive {
                        background-color: red;
                        color: white;
                        padding: 5px;
                        border-radius: 5px;
                    }
                `}
            </style>
            <form className="d-flex">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <input
                            type="search"
                            className="form-control rounded"
                            placeholder="Tìm kiếm"
                            aria-label="Tìm kiếm"
                            aria-describedby="search-addon"
                        />

                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="combo d-flex align-items-center">
                            <label className="mr-2">Trạng Thái:</label>
                            <select className="form-select">
                                <option>Chọn trạng thái  ..... </option>
                                <option value="1">Hoạt Động</option>
                                <option value="0">Không Hoạt Động</option>

                            </select>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="input-group mb-2 d-flex align-items-center">
                            <label className="mr-2">Ngày Bắt Đầu:</label>
                            <input
                                type="date"
                                className="form-control rounded"
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="search-addon"
                            />
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="input-group mb-2 d-flex align-items-center">
                            <label className="mr-2">Ngày Kết Thúc:</label>
                            <input
                                type="date"
                                className="form-control rounded"
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="search-addon"
                            />
                            <button type="button" className="btn btn-outline-danger" style={{ borderRadius: '20px' }}>Tìm kiếm</button>
                        </div>
                    </div>
                </div>
            </form>
            <div className="h6">
                <h1 className="p-3 mb-2 bg-info text-white" style={{ borderRadius: '20px', padding: '25px', marginBottom: '25px' }}>
                    <i className="fa-solid fa-list bg-primary" ></i>
                    Danh Sách Phiếu Giảm Giá
                </h1>
            </div>
            <br />
            <button
                className="btn btn-primary"
                onClick={addPGG}
                style={{
                    display: 'block',
                    marginBottom: '20px'
                }}> +  Thêm  </button>

            <table className="table table-hover text-center">
                <thead className="thead-dark" >
                    <tr className="text-center" >
                        <th scope="col">STT</th>
                        <th scope="col">Mã </th>
                        <th scope="col">Tên</th>
                        <th scope="col">Số lượng </th>
                        <th scope="col">Hình Thức Giảm </th>
                        <th scope="col">Điều Kiện Giảm </th>
                        <th scope="col">Giảm Tối Đa </th>
                        <th scope="col">Giá Trị Giảm </th>
                        <th scope="col">Ngày Bắt Đầu </th>
                        <th scope="col">Ngày Kết Thúc </th>
                        <th scope="col">Ngày Tạo </th>
                        <th scope="col">Ngày Cập Nhật </th>
                        <th scope="col">Người Tạo </th>
                        <th scope="col">Người Cập Nhật </th>
                        <th scope="col">Trạng Thái</th>
                        <th scope="col" className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {
                        phieuGiamGias.map((phieuGiamGia, index) => (
                            <tr key={phieuGiamGia.id}>
                                <td>{index + 1}</td>
                                <td>{phieuGiamGia.ma}</td>
                                <td>{phieuGiamGia.ten}</td>
                                <td>{phieuGiamGia.soLuong}</td>
                                <td>{hinhThucGiam(phieuGiamGia.hinhThucGiam)}</td>
                                <td>{phieuGiamGia.dieuKienGiam}</td>
                                <td>{phieuGiamGia.giamToiDa}</td>
                                <td>{phieuGiamGia.giaTriGiam}</td>
                                <td>{moment(phieuGiamGia.ngayBatDau).format('YYYY-MM-DD')}</td>
                                <td>{moment(phieuGiamGia.ngayKetThuc).format('YYYY-MM-DD')}</td>
                                <td>{moment(phieuGiamGia.ngayTao).format('YYYY-MM-DD')}</td>
                                <td>{moment(phieuGiamGia.ngayCapNhat).format('YYYY-MM-DD')}</td>
                                <td>{phieuGiamGia.nguoiTao}</td>
                                <td>{phieuGiamGia.nguoiCapNhat}</td>
                                <td>{trangThai(phieuGiamGia.trangThai)}</td>
                                <td className="text-center">
                                    <button className="btn btn-success me-2" onClick={() => updatePGG(phieuGiamGia.id)}><i className="fa-solid fa-pen"></i></button>
                                    <button type="button" className="btn btn-warning me-2" onClick={() => openDetailModal(phieuGiamGia.id)}><i className="fa-solid fa-eye"></i></button>
                                    <button type="button" className="btn btn-danger" onClick={() => deletePGG(phieuGiamGia.id)}>  <i className="bi bi-trash3"></i> </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="text-center">
                <button type="button" className="btn btn-light" onClick={prev}>
                    <i className="fa-solid fa-angles-left"></i>
                </button>
                <span className="mx-2"> {currentPage + 1}</span>
                <button type="button" className="btn btn-light" onClick={next}>
                    <i className="fa-solid fa-angles-right"></i>
                </button>
            </div>
            {/* Modal */}
            {selectedPGG && (
                <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header" style={modalStyles.modalHeader}>
                                <h5 className="modal-title" style={modalStyles.modalTitle}><i className="bi bi-eye-fill"></i> </h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body" style={modalStyles.modalBody}>
                                <div className="row">

                                    <div className="col-8">
                                        <p style={modalStyles.modalBodyP}><strong>Mã Phiếu Giảm Giá:</strong> {selectedPGG.ma}</p>
                                        <p style={modalStyles.modalBodyP}><strong>Tên:</strong> {selectedPGG.ten}</p>
                                        <p style={modalStyles.modalBodyP}><strong>Số Lượng:</strong> {selectedPGG.soLuong}</p>
                                        <p style={modalStyles.modalBodyP}><strong>Hình Thức Giảm:</strong> {hinhThucGiam(selectedPGG.hinhThucGiam)}</p>
                                        <p style={modalStyles.modalBodyP}><strong>Điều Kiện Giảm:</strong> {selectedPGG.dieuKienGiam}</p>
                                        <p style={modalStyles.modalBodyP}><strong>Giảm Tối Đa:</strong> {selectedPGG.giamToiDa}</p>
                                        <p style={modalStyles.modalBodyP}><strong>Giá Trị Giảm:</strong> {selectedPGG.giaTriGiam}</p>
                                        <p style={modalStyles.modalBodyP}><strong>Ngày Bắt Đầu:</strong> {moment(selectedPGG.ngayBatDau).format('YYYY-MM-DD')}</p>
                                        <p style={modalStyles.modalBodyP}><strong>Ngày Kết Thúc:</strong> {moment(selectedPGG.ngayKetThuc).format('YYYY-MM-DD')}</p>
                                        <p style={modalStyles.modalBodyP}><strong>Ngày Tạo:</strong> {moment(selectedPGG.ngayTao).format('YYYY-MM-DD')}</p>
                                        <p style={modalStyles.modalBodyP}><strong>Ngày Cập Nhật:</strong> {moment(selectedPGG.ngayCapNhat).format('YYYY-MM-DD')}</p>
                                        <p style={modalStyles.modalBodyP}><strong>Người Tạo:</strong> {selectedPGG.nguoiTao}</p>
                                        <p style={modalStyles.modalBodyP}><strong>Người Cập Nhật:</strong> {selectedPGG.nguoiCapNhat}</p>
                                        <p style={modalStyles.modalBodyP}><strong>Trạng Thái:</strong> {trangThai(selectedPGG.trangThai)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer" style={modalStyles.modalFooter}>
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PhieuGiamGiaPage;


