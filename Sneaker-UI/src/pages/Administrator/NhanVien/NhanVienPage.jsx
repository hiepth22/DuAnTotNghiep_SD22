import React from "react";

function NhanVienPage() {

    function addNhanVien() {
        navigate(`/edit-nhanvien`);
    }
    return (
        <div className="container">
            <label for="customRange2" class="form-label">Khoảng Tuổi :
            <input type="range" class="form-range" min="18" max="80" id="customRange2"/>
            </label>

            <h4 className="" > <i className="fa-solid fa-list .bg-dark"></i> Danh Sách Nhân Viên </h4>
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
                        <th scope="col">Giới Tính</th>
                        <th scope="col">Trạng Thái</th>
                        <th scope="col" className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="text-center">
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td className="text-center">
                            <button className="btn btn-success" ><i class="fa-solid fa-pen"></i></button> 
                            <button type="button" className="btn btn-warning" ><i class="fa-solid fa-eye"></i></button>
                            </td>
                    </tr>

                </tbody>
            </table>


        </div>
    );
}

export default NhanVienPage;