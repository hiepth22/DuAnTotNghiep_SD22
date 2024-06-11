import React, { useEffect, useState } from "react";
import { GetAllNhanvien, updatett } from "../../../../services/NhanVienSevice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Popover, Form, Input } from "antd";

const NhanVienPage = () => {
    const [nhanviens, setNhanviens] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const fetchAllNhanviens = () => {
        GetAllNhanvien()
            .then((response) => {
                setNhanviens(response.data);
            })
            .catch((error) => {
                console.error(error);
                toast.error('Failed to fetch data');
            });
    };

    useEffect(() => {
        fetchAllNhanviens();
    }, []);

    const detailNhanVien = (id, ten) => {
        if (window.confirm(`Bạn có chắc chắn muốn ngừng hoạt động nhân viên ${ten}?`)) {
            updatett(id)
                .then(() => {
                    toast.success(`Ngừng hoạt động nhân viên ${ten}`);
                    fetchAllNhanviens(); // Refresh data after update
                    setTimeout(() => {
                        window.location.reload(); // Reload page after data is fetched
                    }, 1500); // Adding a slight delay to ensure data is fetched
                })
                .catch((error) => {
                    toast.error(`Cập nhật thất bại: ${error.message}`);
                });
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

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    const handleSubmit = (values) => {
        console.log('Form Values:', values);
        hide();
    };

    const hide = () => {
        setOpen(false);
        form.resetFields();
    };

    return (
        <div className="container mt-4">
            <form className="d-flex">
                <div className="cot1">
                    <div className="input-group mb-2">
                        <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                        <button type="button" className="btn btn-outline-primary">Search</button>
                    </div>
                    <div className="combo mb-3">
                        <select className="form-control">
                            <option>Chọn Vai Trò</option>
                            <option id="1">Quản Lý</option>
                            <option id="2">Nhân Viên</option>
                        </select>
                    </div>
                </div>
                <div className="cot1">
                    <div className="input-group mb-2">
                        <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                        <button type="button" className="btn btn-outline-primary">Search</button>
                    </div>
                    <div className="combo mb-3">
                        <select className="form-control">
                            <option>Chọn Vai Trò</option>
                            <option id="1">Quản Lý</option>
                            <option id="2">Nhân Viên</option>
                        </select>
                    </div>
                </div>
            </form>

            <h4 className="fs-3 p-3 mb-2 bg-success text-white">
                <i className="fa-solid fa-list"></i> Danh Sách Nhân Viên
            </h4>
            <br />
            <Popover
                content={
                    <Form form={form} onFinish={handleSubmit}>
                        <Form.Item name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                            <Input placeholder="Name" />
                        </Form.Item>
                        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                            <Input placeholder="Email" />
                        </Form.Item>
                        {/* Add additional Form.Items here as needed */}
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Submit</Button>
                            <Button style={{ marginLeft: '8px' }} onClick={hide}>Close</Button>
                        </Form.Item>
                    </Form>
                }
                title="Form Title"
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
            >
                <Button type="primary">+ Thêm</Button>
            </Popover>
            <table className="table table-bg-gray text-center">
                <thead className="thead-dark">
                    <tr className="text-center ">
                        <th scope="col">STT</th>
                        <th scope="col">Ảnh</th>
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
                            <td>{nhanvien.anh}</td>
                            <td>{nhanvien.ten}</td>
                            <td>{nhanvien.ma}</td>
                            <td>{nhanvien.sdt}</td>
                            <td>{nhanvien.ngaySinh}</td>
                            <td>{GioiTinh(nhanvien.gioiTinh)}</td>
                            <td>{nhanvien.cccd}</td>
                            <td>{vaitro(nhanvien.vaiTro)}</td>
                            <td>{Trangthai(nhanvien.trangThai)}</td>
                            <td className="text-center">
                                <button className="btn btn-success" onClick={() => navigate(`/admin/nhanvien-add/${nhanvien.id}`)}>
                                    <i className="fa-solid fa-pen"></i>
                                </button>
                                <button type="button" className="btn btn-warning" onClick={() => detailNhanVien(nhanvien.id, nhanvien.ten)}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
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
};

export default NhanVienPage;
