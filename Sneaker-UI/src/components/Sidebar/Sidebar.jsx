import { ProductOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    label,
    key,
    icon,
    children,
    type,
  };
}

const items = [
  {
    key: "1",
    icon: <i className="fa-solid fa-receipt"></i>,
    label: <Link className="text-decoration-none">Phiếu giảm giá</Link>,
  },
  {
    key: "2",
    icon: <i className="fa-solid fa-file-invoice-dollar"></i>,
    label: <Link className="text-decoration-none">Hóa đơn</Link>,
  },
  {
    key: "3",
    icon: <i className="fa-solid fa-cubes"></i>,
    label: <Link className="text-decoration-none">Sản phẩm</Link>,
  },
  {
    key: "4",
    label: "Product Manager",
    icon: <ProductOutlined />,
    children: [
      {
        key: "4a",
        label: <Link className="text-decoration-none">Material</Link>,
      },
    ],
  },
];

function Sidebar() {
  return (
    <>
      <Menu theme="light" mode="inline" items={items} />
    </>
  );
}

export default Sidebar;
