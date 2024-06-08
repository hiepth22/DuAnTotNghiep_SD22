import React, { useEffect, useState } from "react";
import moment from 'moment';
import { getAll, add, detail, update } from "../../../../services/KhachHangService";
import { useNavigate } from "react-router-dom";

function KhachHangPage() {
    const [khachHangs, setKH] = useState([]);
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

    const detailKH = (id) => {
        nav(`/admin/khachhang-detail/${id}`);
    };

    return (
        <div className="container mt-4">
            <form className="d-flex">
                <div className="cot1">
                    <div className="input-group mb-2">
                        <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                        <button type="button" className="btn btn-outline-primary" data-mdb-ripple-init>search</button>
                    </div>
                    <div className="combo mb-3">
                        {/* Additional filters can be added here */}
                    </div>
                </div>
            </form>

            <h4 className="fs-3 p-3 mb-2 bg-success text-white"><i className="fa-solid fa-list .bg-dark"></i> Danh Sách Khách Hàng </h4>
            <br />
            <button className="btn btn-danger mb-3" onClick={addKH}> + Thêm </button>
            <table className="table table-bg-gray text-center">
                <thead className="thead-dark">
                    <tr className="text-center">
                        <th scope="col">STT</th>
                        <th scope="col">Ảnh</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Mã Khách Hàng</th>
                        <th scope="col">Số Điện Thoại</th>
                        <th scope="col">Ngày Sinh</th>
                        <th scope="col">Giới Tính</th>
                        <th scope="col">Cccd</th>
                        <th scope="col">Trạng Thái</th>
                        <th scope="col" className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {
                        khachHangs.map((khachHang, index) => (
                            <tr key={khachHang.id}>
                                <td>{index + 1}</td>
                                <td><img src={khachHang.anh} alt="Avatar" width="50" height="50" /></td>
                                <td>{khachHang.ten}</td>
                                <td>{khachHang.ma}</td>
                                <td>{khachHang.sdt}</td>
                                <td>{moment(khachHang.ngaySinh).format('YYYY-MM-DD')}</td> {/* Định dạng lại ngày sinh */}
                                <td>{gt(khachHang.gioiTinh)}</td>
                                <td>{khachHang.cccd}</td>
                                <td>{trangThai(khachHang.trangThai)}</td>
                                <td className="text-center">
                                    <button className="btn btn-success" onClick={() => updateKH(khachHang.id)}><i className="fa-solid fa-pen"></i></button>
                                    <button type="button" className="btn btn-warning" onClick={() => detailKH(khachHang.id)}><i className="fa-solid fa-eye"></i></button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="text-center">
                <button type="button" className="btn btn-light">
                    <i className="fa-solid fa-angles-left"></i>
                </button>
                <button type="button" className="btn btn-light">
                    <i className="fa-solid fa-angles-right"></i>
                </button>
            </div>
        </div>
    );
}

export default KhachHangPage;
