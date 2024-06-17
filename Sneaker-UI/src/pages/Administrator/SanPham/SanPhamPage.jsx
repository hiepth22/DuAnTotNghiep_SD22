import React, { useEffect, useState } from "react";
import SanPhamService from "../../../services/SanPhamService/SanPhamService";
import SanPhamChiTietService from "../../../services/SanPhamService/SanPhamChiTietService";
import { Empty, Table, Tag, Space, Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

function SanPhamPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [data, setData] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      let response = await SanPhamService.getAll();
      const tongSoLuong = await Promise.all(
        response.map(async (item) => {
          const soLuong = await SanPhamChiTietService.getAllBySP(item.id);
          return { ...item, soLuongBienThe: soLuong.length };
        })
      );
      setData(tongSoLuong);
    };
    getData();
  }, [loadData]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "ten",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Thương hiệu",
      dataIndex: "thuongHieu",
      render: (text, record) => <a>{record.thuongHieu.ten}</a>,
    },
    {
      title: "Số lượng biến thể",
      dataIndex: "soLuongBienThe",
      render: (soLuongBienThe) => <span>{soLuongBienThe}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      render: (trangThai) => {
        const status = trangThai ? "green" : "red";
        return (
          <Tag color={status}>{trangThai ? "Hoạt động" : "Tạm ngưng"}</Tag>
        );
      },
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <Space>
          <Button type="text">
            <i className="fa-solid fa-eye"></i>
          </Button>
          <Button
            type="text"
            onClick={() => {
              navigate("detail/" + record.id);
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h2>Danh sách sản phẩm</h2>
      <div className="p-2 bg-body-tertiary rounded box-shadow">
        <Row>
          <Col>
            <Space className="d-flex align-items-end w-100 h-100 justify-content-center">
              <Button
                onClick={() => {
                  navigate("add");
                }}
              >
                Thêm sản phẩm
              </Button>
            </Space>
          </Col>
        </Row>
        {data.length > 0 ? (
          <Table
            columns={columns}
            dataSource={data}
            rowKey={"id"}
            pagination={{
              pageSize,
              onChange: (page) => setCurrentPage(page),
            }}
          ></Table>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
}

export default SanPhamPage;
