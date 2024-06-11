import React, { useEffect, useState } from "react";
import { GetAllNhanvien, detailNhanvien, phantrangsevice, updatett } from "../../../../services/NhanVienSevice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Modal, Form, Input, Row, Col } from "antd";

function NhanVienPage() {
  const [nhanviens, setNhanviens] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNhanVienId, setSelectedNhanVienId] = useState(null); // State to hold the selected row's ID
  const [form] = Form.useForm();


  const [currentPage, setCurrentPage] = useState(0);

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
         
          toast.error('Dữ liệu không có sẵn');
        } else {
          setNhanviens(response.data);
          setCurrentPage(page);
        }
      })
      .catch((error) => {
        console.error(error);
       
      });
  };
  
  useEffect(() => {
    phantrang(currentPage);
  }, [currentPage]);
  

  const fetchNhanVienDetails = (id) => {
    detailNhanvien(id)
      .then((nv) => {
        form.setFieldsValue({
          anh: nv.data.anh,
          ten: nv.data.ten,
          ma: nv.data.ma,
          sdt: nv.data.sdt,
          ngaySinh: nv.data.ngaySinh,
          email: nv.data.email,
          gioiTinh: nv.data.gioiTinh ? "Nữ" : "Nam",
          cccd: nv.data.cccd,
          matKhau: nv.data.matKhau,
          vaiTro: nv.data.vaiTro ? "Quản lý" : "Nhân Viên",
          trangThai: nv.data.trangThai ? " Hoạt Động" : "Không Hoạt Động",
          diachi: nv.data.diachi,
          ngaytao: nv.data.ngaytao,
          ngaycapnhap: nv.data.ngaycapnhap,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };


  const detailNhanVien = (id, ten) => {
    updatett(id)
      .then(() => {
        toast.success(`Ngừng hoạt động nhân viên ${ten}`);
        phantrang(); 
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        toast.error(`Cập nhật thất bại: ${error.message}`);
      });
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

  const handleSubmit = (values) => {
    console.log('Form Values:', values);
    handleCancel();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const addNhanVien = () => {
    navigate('/admin/nhanvien-add');
  };

  const updateNhanVien = (id) => {
    navigate(`/admin/nhanvien-add/${id}`);
  };

  const handleShowFormClick = (id) => {
    setSelectedNhanVienId(id);
    fetchNhanVienDetails(id);
    setIsModalOpen(true);
  };

  return (
    <div className="container mt-4">
      <div className="mt-4"> {/* Thêm margin top 4 */}
        <form className="d-flex flex-wrap justify-content-center">
          <div className="cot1 col-lg-5 mr-lg-3 mb-3"> {/* Chia form thành 2 cột và thêm margin right và bottom */}
            <div className="row justify-content-center mr-20px">
              <div className="col-md-6 mb-3"> {/* Chia cột */}
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
              <div className="col-md-6 mb-3"> {/* Chia cột */}
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
      <button className="btn btn-danger mb-3" onClick={addNhanVien}> + Thêm </button>
      <table className="table table-bg-gray text-center">
        <thead className="thead-dark">
          <tr className="text-center">
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
                <button className="btn btn-success" style={{ marginLeft: '8px' }} onClick={() => updateNhanVien(nhanvien.id)}>
                  <i className="fa-solid fa-pen"></i>
                </button>
                <button type="button" style={{ marginLeft: '8px' }} className="btn btn-warning" onClick={() => detailNhanVien(nhanvien.id, nhanvien.ten)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
                <button type="primary" onClick={() => handleShowFormClick(nhanvien.id)} style={{ marginLeft: '8px' }} className="btn btn-info"><i className="fa-solid fa-circle-info"></i></button>
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


      <Modal
        title="Thông Tin Chi Tiết Nhân Viên"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
      > <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="ten" label="Tên Nhân Viên">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="ngaycapnhap" label="Ngày Cập Nhập">
                <Input readOnly />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="ma" label="Mã Nhân Viên">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="sdt" label="Số Điện Thoại">
                <Input readOnly />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="ngaySinh" label="Ngày Sinh">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="email" label="Email">
                <Input readOnly />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="gioiTinh" label="Giới Tính">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="cccd" label="CCCD">
                <Input readOnly />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="matKhau" label="Mật Khẩu">
                <Input type="password" readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="vaiTro" label="Vai Trò">
                <Input readOnly />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="trangThai" label="Trạng Thái">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="diachi" label="Địa Chỉ">
                <Input readOnly />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="ngaytao" label="Ngày Tạo">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="ngaycapnhap" label="Ngày cập nhập">
                <Input readOnly />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="text-right">
            <Button type="primary" onClick={handleCancel} style={{ marginTop: '16px' }}>
              Close
            </Button>
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
}

export default NhanVienPage;
