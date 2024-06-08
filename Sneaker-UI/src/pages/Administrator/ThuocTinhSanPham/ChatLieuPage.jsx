import React, { useEffect, useState } from "react";
import { Empty, Form, Table, Tag, Space, Button } from "antd";
import ChatLieuService from "../../../services/SanPhamService/ChatLieuService";

function ChatLieuPage() {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const getData = async () => {
    try {
      let response = await ChatLieuService.getAll();
      setDataSource(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Tên chất liệu",
      dataIndex: "ten",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Mô tả chi tiết",
      dataIndex: "moTa",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngayTao",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Người tạo",
      dataIndex: "nguoiTao",
      render: (text) => <a>{text ? text : "N/A"}</a>,
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
          <Button>Sửa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Quản lý chất liệu</h1>
      {dataSource.length > 0 ? (
        <Table
          columns={columns}
          dataSource={dataSource}
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
  );
}

export default ChatLieuPage;
