import React,{useEffect, useState} from "react";
import { GetAllThuongHieu } from "../../../../services/NhanVienSevice";
import { useNavigate } from "react-router-dom";


function NhanVienPage() {

    const [nhanviens, setnhanviens] = useState([]);
    const Navigate = useNavigate();

    const GioiTinh = (gt) => {
        return gt ? "Nam" : "Nữ";
      };

    useEffect(()=>{
        GetAllThuongHieu().then((response)=>{
            setnhanviens(response.data);
        }).catch(error =>{
            console.log(error);
        })
    },[])
    // const data=[
    //     {
    //     "id": 1,
    //     "ten": "tuan",
    //     "ma": "NV001",
    //     "sdt": "0975920575",
    //     "ngaySinh": "2022-01-01T00:00:00",
    //     "email": "tuanltph30142",
    //     "gioiTinh": true,
    //     "cccd": "033232323232",
    //     "anh": null,
    //     "matKhau": "tuanhan123",
    //     "vaiTro": 2,
    //     "trangThai": 1
    // }]

    const addNhanVien = ()=> {
        Navigate('/admin/nhanvien-add');
    }
    return (
        <div className="container">
            <label for="customRange2" class="form-label">Khoảng Tuổi :
            <input type="range" class="form-range" min="18" max="80" id="customRange2"/>
            </label>

            <h4 className="" > <i className="fa-solid fa-list .bg-dark"></i> Danh Sách Nhân Viên </h4>
            <br />
            <button className="btn btn-primary mb-3" onClick={addNhanVien}> + Thêm </button>
            <table className="table table-bg-gray">
                <thead className="thead-dark">
                    
                    <tr className="text-center">
                        <th scope="col">STT</th>
                        <th scope="col">Ảnh</th>
                        <th scope="col">Tên Nhân Viên</th>
                        <th scope="col">Mã Nhân Viên</th>
                        <th scope="col">Số Điện Thoại</th>
                        <th scope="col">Ngày Sinh</th>
                        <th scope="col">Email</th>
                        <th scope="col">Giới Tính</th>
                        <th scope="col">Cccd</th>
                        <th scope="col">Mật Khẩu</th>
                        <th scope="col">Vai Trò</th>
                        <th scope="col">Trạng Thái</th>
                        <th scope="col" className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {
                        nhanviens.map((nhanvien,index) =>
                            <tr key={nhanvien.id}>
                                <td>{index + 1}</td>
                                <td>{nhanvien.anh}</td>
                                <td>{nhanvien.ten}</td>
                                <td>{nhanvien.ma}</td>
                                <td>{nhanvien.sdt}</td>
                                <td>{nhanvien.ngaySinh}</td>
                                <td>{nhanvien.email}</td>
                                <td>{GioiTinh(nhanvien.gioiTinh)}</td>
                                <td>{nhanvien.cccd}</td>
                                <td>{nhanvien.matKhau}</td>
                                <td>{nhanvien.vaiTro}</td>
                                <td>{nhanvien.trangThai}</td>
                                <td>
                                <button className="btn btn-success" ><i class="fa-solid fa-pen"></i></button> 
                                <button type="button" className="btn btn-warning" ><i class="fa-solid fa-eye"></i></button>
                                </td>
                            </tr>
                            )
                    }
                

                </tbody>
            </table>


        </div>
    );
}

export default NhanVienPage;