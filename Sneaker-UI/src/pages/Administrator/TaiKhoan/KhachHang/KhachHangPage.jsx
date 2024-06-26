import React, { useEffect, useState } from "react";
import moment from 'moment';
import { getAll, detail, updatett } from "../../../../services/KhachHangService";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function KhachHangPage() {
    const [khachHangs, setKH] = useState([]);
    const [selectedKH, setSelectedKH] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Sửa từ 0 thành 1 để tính số trang chính xác
    const [searchKeyword, setSearchKeyword] = useState("");
    const [originalData, setOriginalData] = useState([]);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const recordPerPage = 5;

    const navigate = useNavigate();

    const buildCloudinaryUrl = (publicId) => {
        const cloudName = "deapopcoc"; // Thay bằng tên cloud của bạn
        return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;
    };

    const gt = (gt) => {
        return gt ? "Nam" : "Nữ";
    };

    const trangThai = (tt) => {
        return tt ? "Hoạt Động" : "Ngưng Hoạt Động";
    };

    const searchKH = (keyword) => {
        const filteredKH = originalData.filter(kh => {
            return (
                kh.ten.toLowerCase().includes(keyword.toLowerCase()) ||
                kh.ma.toLowerCase().includes(keyword.toLowerCase()) ||
                kh.sdt.toLowerCase().includes(keyword.toLowerCase()) ||
                kh.cccd.toLowerCase().includes(keyword.toLowerCase()) ||
                kh.email.toLowerCase().includes(keyword.toLowerCase()) 
            );
        });
        setKH(filteredKH);
    };

    const fetchAndSaveOriginalData = async () => {
        try {
            const response = await getAll();
            setOriginalData(response.data);
            setKH(response.data); // Khởi tạo khách hàng ban đầu
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAndSaveOriginalData();
    }, []);

    useEffect(() => {
        searchKH(searchKeyword);
    }, [searchKeyword]);

    const addKH = () => {
        navigate('/admin/khachhang-add');
    };

    const updateKH = (id) => {
        navigate(`/admin/khachhang-add/${id}`);
    };

    const updatetrangthai = async (id, ten) => {
        try {
            await updatett(id);
            toast.success(`Đã ngừng hoạt động khách hàng: ${ten}`);
            setTimeout(() => {
                window.location.reload(); // Reload trang sau khi cập nhật thành công
            }, 1500);
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái:', error);
            toast.error('Đã xảy ra lỗi khi cập nhật trạng thái.');
        }
    };

    const openDetailModal = (id) => {
        detail(id).then((response) => {
            setSelectedKH(response.data);
            setShowModal(true);
        }).catch((error) => {
            console.log(error);
        });
    };

    const openAddressModal = (address) => {
        setSelectedAddress(address);
        setShowAddressModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedKH(null);
        setShowAddressModal(false);
        setSelectedAddress(null);
    };

    // Tính toán phân trang
    const indexOfLastRecord = currentPage * recordPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
    const currentRecords = khachHangs.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(khachHangs.length / recordPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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
            <form className="d-flex">
                <div className="cot1">
                    <div className="input-group mb-2">
                        <input
                            type="search"
                            className="form-control rounded"
                            placeholder="Tìm kiếm"
                            aria-label="Tìm kiếm"
                            aria-describedby="search-addon"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                    </div>
                    <div className="combo mb-3">
                    </div>
                </div>
            </form>
            <div className="h6">
                <h1 className="p-3 mb-2 bg-secondary text-white" style={{ borderRadius: '10px', padding: '15px', marginBottom: '20px' }}>
                    <i className="fa-solid fa-list bg-dark" ></i> Danh Sách Khách Hàng
                </h1>
            </div>
            <br />
            <button className="btn btn-primary" onClick={addKH} style={{ display: 'block', marginBottom: '20px' }}>
                <i className="bi bi-file-plus"></i> Thêm
            </button>
            <table className="table table-hover text-center">
                <thead className="thead-dark" >
                    <tr className="text-center" >
                        <th scope="col">STT</th>
                        <th scope="col">Ảnh</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Mã Khách Hàng</th>
                        <th scope="col">Số Điện Thoại</th>
                        <th scope="col">Ngày Sinh</th>
                        <th scope="col">Giới Tính</th>
                        <th scope="col">CCCD</th>
                        <th scope="col">Email</th>
                        <th scope="col">Trạng Thái</th>
                        <th scope="col" className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {
                        currentRecords.map((khachHang, index) => (
                            <tr key={khachHang.id}>
                                <td>{index + 1}</td>
                                <td><img
                                    src={buildCloudinaryUrl(khachHang.anh)}
                                    style={{ width: 70, height: 70 }} />
                                </td>
                                <td>{khachHang.ten}</td>
                                <td>{khachHang.ma}</td>
                                <td>{khachHang.sdt}</td>
                                <td>{moment(khachHang.ngaySinh).format('YYYY-MM-DD')}</td>
                                <td>{gt(khachHang.gioiTinh)}</td>
                                <td>{khachHang.cccd}</td>
                                <td>{khachHang.email}</td>
                                <td>{trangThai(khachHang.trangThai)}</td>
                                <td className="text-center">
                                    <button className="btn btn-success me-2" onClick={() => updateKH(khachHang.id)}><i className="fa-solid fa-pen"></i></button>
                                    <button type="button" className="btn btn-warning me-2" onClick={() => openDetailModal(khachHang.id)}><i className="fa-solid fa-eye"></i></button>
                                    <button type="button" className="btn btn-info me-2" onClick={() => openAddressModal(khachHang.diaChi)}><i className="bi bi-geo-alt-fill"></i></button>
                                    <button type="button" className="btn btn-danger" onClick={() => updatetrangthai(khachHang.id, khachHang.ten)}> <i className="bi bi-trash3"></i> </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={handlePrevPage}>Previous</button>
                        </li>
                        {pageNumbers.map((number) => (
                            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(number)}>{number}</button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={handleNextPage}>Next</button>
                        </li>
                    </ul>
                </nav>
            </div>
            {/* Detail Modal */}
            {selectedKH && (
                <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header" style={modalStyles.modalHeader}>
                                <h5 className="modal-title" style={modalStyles.modalTitle}><i className="bi bi-eye-fill"></i> Chi tiết khách hàng</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body" style={modalStyles.modalBody}>
                                <div className="row">
                                    <div className="col-4 text-center">
                                        <img src={buildCloudinaryUrl(selectedKH.anh)} alt="Avatar" style={modalStyles.imgFluid} />
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
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Address Modal */}
            {selectedAddress && (
                <div className={`modal fade ${showAddressModal ? 'show' : ''}`} style={{ display: showAddressModal ? 'block' : 'none' }} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header" style={modalStyles.modalHeader}>
                                <h5 className="modal-title" style={modalStyles.modalTitle}><i className="bi bi-geo-alt-fill"></i> Địa chỉ khách hàng</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body" style={modalStyles.modalBody}>
                                <p>{selectedAddress}</p>
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

export default KhachHangPage;
