import {
  ProductOutlined,
  AppstoreAddOutlined,
  TableOutlined,
} from "@ant-design/icons";
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
    key: "3",
    icon: <ProductOutlined />,
    label: (
      <Link className="text-decoration-none" to={"san-pham"}>
        Sản phẩm
      </Link>
    ),
  },
  {
    key: "4",
    label: "Thuộc tính",
    icon: <AppstoreAddOutlined />,
    children: [
      {
        key: "4a",
        icon: <i className="fa-brands fa-mdb"></i>,
        label: (
          <Link className="text-decoration-none" to={"chat-lieu"}>
            Chất liệu
          </Link>
        ),
      },
      {
        key: "4b",
        icon: <i className="fa-solid fa-shoe-prints"></i>,
        label: (
          <Link className="text-decoration-none" to={"de-giay"}>
            Đế giày
          </Link>
        ),
      },
      {
        key: "4c",
        icon: <i className="fa-solid fa-industry"></i>,
        label: (
          <Link className="text-decoration-none" to={"nha-san-xuat"}>
            Nhà sản xuất
          </Link>
        ),
      },
      {
        key: "4d",
        icon: <i className="fa-solid fa-list-ol"></i>,
        label: (
          <Link className="text-decoration-none" to={"kich-co"}>
            Kích cỡ
          </Link>
        ),
      },
      {
        key: "4e",
        icon: <i className="fa-solid fa-paint-roller"></i>,
        label: (
          <Link className="text-decoration-none" to={"mau-sac"}>
            Màu sắc
          </Link>
        ),
      },
      {
        key: "4f",
        icon: <i className="fa-solid fa-trademark"></i>,
        label: (
          <Link className="text-decoration-none" to={"thuong-hieu"}>
            Thương hiệu
          </Link>
        ),
      },
      {
        key: "4f",
        icon: <i className="fa-solid fa-bars"></i>,
        label: (
          <Link className="text-decoration-none" to={"danh-muc"}>
            Danh mục
          </Link>
        ),
      },
    ],
  },
  {
    key: "1",
    icon: <i className="fa-solid fa-receipt"></i>,
    label: (
      <Link class="text-decoration-none" to={"phieu-giam-gia"}>
        Phiếu giảm giá
      </Link>
    ),
  },
  {
    key: "2",
    icon: <i className="fa-solid fa-file-invoice-dollar"></i>,
    label: (
      <Link className="text-decoration-none" to={"hoa-don"}>
        Hóa đơn
      </Link>
    ),
  },
  {
    key: "5",
    icon: <i className="fa-solid fa-chart-pie"></i>,
    label: (
      <Link className="text-decoration-none" to={"thong-ke"}>
        Thống kê
      </Link>
    ),
  },
  {
    key: "6",
    icon: <i className="fa-solid fa-users"></i>,
    label: (
      <Link className="text-decoration-none" to={"tai-khoan"}>
        Tài khoản
      </Link>
    ),
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
