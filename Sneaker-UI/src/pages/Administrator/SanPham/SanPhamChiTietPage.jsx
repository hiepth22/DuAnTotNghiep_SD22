import React, { useEffect, useState } from "react";
import SanPhamService from "../../../services/SanPhamService/SanPhamService";
import SanPhamChiTietService from "../../../services/SanPhamService/SanPhamChiTietService";
import { useParams } from "react-router-dom";
import { Space, Table, Tag, Typography, Card, Button } from "antd";
import formatPrice from "../../../utils/FormatPrice";

function SanPhamChiTietPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const params = useParams();
  const [loadData, setLoadData] = useState(false);
  const [sanPham, setSanPham] = useState();
  const [sanPhamChiTiet, setSanPhamChiTiet] = useState([]);

  const [sanPhams, setSanPhams] = useState([]);
  const [chatLieus, setChatLieus] = useState([]);
  const [deGiays, setDeGiays] = useState([]);
  const [coGiays, setCoGiays] = useState([]);
  const [kichCos, setKichCos] = useState([]);
  const [mauSacs, setMauSacs] = useState([]);
  const [nhaSanXuats, setNhaSanXuats] = useState([]);
  const [thuongHieus, setThuongHieus] = useState([]);

  let getSanPhamById = async () => {
    let response = await SanPhamService.getById(params.id);
    setSanPham({ ...response });
  };

  let getSanPhamChiTietById = async () => {
    let response = await SanPhamChiTietService.getAllBySP(params.id);
    if (Array.isArray(response)) {
      setSanPhamChiTiet(response);
    } else {
      console.error("Expected array but got: ", response);
      setSanPhamChiTiet([]);
    }
  };

  useEffect(() => {
    getSanPhamById();
    getSanPhamChiTietById();
  }, [loadData]);

  const columns = [
    {
      title: "STT",
      dataIndex: "ten",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Tên",
      dataIndex: "ten",
      render: (text, record) => (
        <>
          <Typography.Text>Giày {record.sanPham.ten}</Typography.Text>
        </>
      ),
    },
    {
      title: "Màu sắc",
      dataIndex: "ten",
      render: (text, record) => <Typography>{record.mauSac.ten}</Typography>,
    },
    {
      title: "Chất liệu",
      dataIndex: "ten",
      render: (text, record) => <Typography>{record.chatLieu.ten}</Typography>,
    },
    {
      title: "Kích cỡ",
      dataIndex: "ten",
      render: (text, record) => <Typography>{record.kichCo.ten}</Typography>,
    },
    {
      title: "Loại cổ",
      dataIndex: "ten",
      render: (text, record) => <Typography>{record.coGiay.ten}</Typography>,
    },
    {
      title: "Loại đế",
      dataIndex: "ten",
      render: (text, record) => <Typography>{record.deGiay.ten}</Typography>,
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      render: (text, record) => <Typography>{text}</Typography>,
    },
    {
      title: "Trọng lượng",
      dataIndex: "canNang",
      render: (text, record) => <Typography>{text}g</Typography>,
    },
    {
      title: "Giá bán",
      dataIndex: "giaBan",
      render: (text, record, index) => (
        <Typography>{formatPrice(text)}</Typography>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      render: (trangThai, record) => {
        const color = trangThai ? "green" : "red";
        return (
          <Tag color={color}>{trangThai ? "Hoạt động" : "Ngưng hoạt động"}</Tag>
        );
      },
    },
    {
      title: "Hành động",
      render: (_, record, index) => (
        <Space>
          <Button type="text">
            <i className="fa-regular fa-pen-to-square"></i>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Space>
        <Card>
          <Table
            columns={columns}
            dataSource={sanPhamChiTiet}
            key={"key"}
            pagination={{
              pageSize,
              onChange: (page) => setCurrentPage(page),
            }}
            bordered
          ></Table>
        </Card>
      </Space>
    </>
  );
}

export default SanPhamChiTietPage;
