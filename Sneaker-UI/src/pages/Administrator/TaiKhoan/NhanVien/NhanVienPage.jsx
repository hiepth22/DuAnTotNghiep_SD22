import React, { useEffect, useState } from "react";
import { phantrangSearch, detailNhanvien, updatett } from "../../../../services/NhanVienSevice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

function NhanVienPage() {
    const [selectedNhanVien, setSelectedNhanVien] = useState(null);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const recordParpage = 5;
    const lastindext = currentPage * recordParpage;
    const firstIndext = lastindext - recordParpage;
    const recordpage = results.slice(firstIndext, lastindext);
    const npage = Math.ceil(results.length / recordParpage)
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const buildCloudinaryUrl = (publicId) => {
        const cloudName = "deapopcoc"; // Replace with your cloud name
        return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;
    };

    const fetchData = async (page, searchKeyword) => {
        try {
            setError(null);
            const response = await phantrangSearch(searchKeyword, page);
            setResults(response.data);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching search results:", err);
        }
    };



    useEffect(() => {
        fetchData(0, keyword);
    }, [0, keyword]);

    const openDetailModal = (id) => {
        detailNhanvien(id)
            .then((response) => {
                setSelectedNhanVien(response.data);
                setShowModal(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const addNhanVien = () => {
        navigate("/admin/nhanvien-add");
    };

    const updateNhanVien = (id) => {
        navigate(`/admin/nhanvien-add/${id}`);
    };

    const updatetrangthai = (id, ten) => {
        updatett(id);
        toast.success(`Đã đổi trạng thái nhân viên: ${ten}`);
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedNhanVien(null);
    };
    function nextPage() {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1)
        }
    }
    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    function changeCpage(id) {
        setCurrentPage(id);
    }
    const GioiTinh = (gt) => (gt ? "Nam" : "Nữ");

    const Trangthai = (tt) => (tt === 0 ? "Không Hoạt Động" : "Hoạt Động");

    const vaitro = (vt) => (vt === 0 ? "Nhân Viên" : "Quản Lí");

    return (
        <div className="container mt-4">
            <div className="row justify-content-center mb-5">
                <div className="col-md-6">
                    <form onSubmit={(e) => e.preventDefault()} className="row align-items-center">
                        <div className="col-auto">
                            <label htmlFor="searchInput" className="form-label mb-0">Tìm kiếm:</label>
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                id="searchInput"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Nhập từ khóa"
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div class="row justify-content-center mb- ">
                <div class="col-8">
                    <div class="row">
                        <div class="col">
                            <select class="form-control mb-2">
                                <option>Chọn trạng thái</option>
                            </select>
                        </div>
                        <div class="col">
                            <select class="form-control mb-2">
                                <option>Chọn Vai Trò</option>
                            </select>
                        </div>
                        <div class="col">
                            <select class="form-control  mb-2">
                                <option>Chọn Giới Tính</option>
                            </select>
                        </div>
                        <div class="col">
                            <input type="date" class="form-control  mb-2" />
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-auto">
                            <button type="submit" class="btn btn-primary mr-2">Tìm Kiếm</button>
                            <button type="button" class="btn btn-secondary">Làm Mới</button>
                        </div>
                    </div>
                </div>
            </div>




            <h4 className="fs-5 p-3 mb-2 bg-success text-white  mt-2">
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
                        <th scope="col">Mail</th>
                        <th scope="col">CCCD</th>
                        <th scope="col">Vai Trò</th>
                        <th scope="col">Trạng Thái</th>
                        <th scope="col" className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {recordpage.length > 0 ? (
                        recordpage.map((nhanvien, index) => (
                            <tr key={nhanvien.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img
                                        src={buildCloudinaryUrl(nhanvien.anh)}
                                        alt="Avatar"
                                        style={{ width: 70, height: 70 }}
                                    />
                                </td>
                                <td>{nhanvien.ten}</td>
                                <td>{nhanvien.ma}</td>
                                <td>{nhanvien.sdt}</td>
                                <td>{nhanvien.ngaySinh ? moment(nhanvien.ngaySinh).format('YYYY-MM-DD') : 'N/A'}</td>
                                <td>{GioiTinh(nhanvien.gioiTinh)}</td>
                                <td>{nhanvien.email}</td>
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
                                        onClick={() => updatetrangthai(nhanvien.id, nhanvien.ten)}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => openDetailModal(nhanvien.id)}
                                        style={{ marginLeft: "8px" }}
                                        className="btn btn-info"
                                    >
                                        <i className="fa-solid fa-circle-info"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="11">Không tìm Thấy</td>
                        </tr>
                    )}
                </tbody>

            </table>
            <div className="d-flex justify-content-center">
                <nav>
                    <ul className="pagination">
                        <li className="page-item">
                            <a href="#" className="page-link" onClick={prePage}>Previous</a>
                        </li>
                        {numbers.map((n, i) => (
                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                <a href="#" className="page-link" onClick={() => changeCpage(n)}>{n}</a>
                            </li>
                        ))}
                        <li className="page-item">
                            <a href="#" className="page-link" onClick={nextPage}>Next</a>
                        </li>
                    </ul>
                </nav>
            </div>





            {selectedNhanVien && (
                <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '1200px' }}>
                        <div className="modal-content">
                            <div className="modal-header" style={modalStyles.modalHeader}>
                                <h5 className="modal-title" style={modalStyles.modalTitle}><i className="bi bi-eye-fill"></i> Chi Tiết Nhân Viên</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body" style={modalStyles.modalBody}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <img src={buildCloudinaryUrl(selectedNhanVien.anh)} alt="Ảnh Đại Diện" style={{ ...modalStyles.modalBodyImage, width: '100%' }} />
                                    </div>
                                    <div className="col-md-6">
                                        <h2 style={modalStyles.modalBodyP}><strong>Tên Nhân Viên:</strong> {selectedNhanVien.ten}</h2>
                                        <h2 style={modalStyles.modalBodyP}><strong>Mã Nhân Viên:</strong> {selectedNhanVien.ma}</h2>
                                        <h2 style={modalStyles.modalBodyP}><strong>Mail:</strong> {selectedNhanVien.email}</h2>
                                        <h2 style={modalStyles.modalBodyP}><strong>Số Điện Thoại:</strong> {selectedNhanVien.sdt}</h2>
                                        <h2 style={modalStyles.modalBodyP}><strong>Ngày Sinh:</strong> {selectedNhanVien.ngaySinh ? moment(selectedNhanVien.ngaySinh).format('YYYY-MM-DD') : 'N/A'}</h2>
                                        <h2 style={modalStyles.modalBodyP}><strong>Giới Tính:</strong> {GioiTinh(selectedNhanVien.gioiTinh)}</h2>
                                        <h2 style={modalStyles.modalBodyP}><strong>CCCD:</strong> {selectedNhanVien.cccd}</h2>
                                        <h2 style={modalStyles.modalBodyP}><strong>Ngày Tạo:</strong> {selectedNhanVien.ngaytao}</h2>
                                        <h2 style={modalStyles.modalBodyP}><strong>Ngày Cập Nhập:</strong> {selectedNhanVien.ngaycapnhap}</h2>
                                        <div style={modalStyles.modalBodyP}>
                                            <strong>Mật Khẩu:</strong> <input type="password" value={selectedNhanVien.matKhau} readOnly />
                                        </div>
                                        <h2 style={modalStyles.modalBodyP}><strong>Vai Trò:</strong> {vaitro(selectedNhanVien.vaiTro)}</h2>
                                        <h2 style={modalStyles.modalBodyP}><strong>Trạng Thái:</strong> {Trangthai(selectedNhanVien.trangThai)}</h2>
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
const modalStyles = {
    modalHeader: { backgroundColor: 'rgb(16, 111, 67)', color: '#fff' },
    modalTitle: { margin: 0 },
    modalBody: { padding: '20px' },
    modalBodyImage: { width: '900px', height: '370px', marginBottom: '10px' },
    modalBodyP: { marginBottom: '10px', fontSize: '18px' },
    modalFooter: { display: 'flex', justifyContent: 'flex-end' }
};



export default NhanVienPage;
