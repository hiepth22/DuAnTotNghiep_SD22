import React, { useState } from "react";
import { Empty, Form, Table } from "antd";

function ChatLieuPage() {
  const [from] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);

  const table = [
    {
      title: "STT",
      render: "#",
    },
    {
      title: "Tên chất liệu",
      dataIndex: "ten",
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
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Trạng thái",
      dataIndex: "ten",
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
        <>
          <Space>
            <Button>Sửa</Button>
          </Space>
        </>
      ),
    },
  ];

  // Hiển thị giao diện người dùng
  return (
    <div>
      <h1>Quản lý chất liệu</h1>
      {dataSource.length > 0 ? (
        <Table columns={table} dataSource={dataSource} rowKey={"id"} />
      ) : (
        <Empty />
      )}
    </div>
  );
}

export default ChatLieuPage;
