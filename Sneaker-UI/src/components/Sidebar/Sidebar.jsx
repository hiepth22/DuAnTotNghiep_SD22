import { ProductOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { GiConverseShoe } from "react-icons/gi";
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
    key: "7",
    icon: <i className="fa-solid fa-store"></i>,
    label: (
      <Link className="text-decoration-none" to={"ban-tai-quay"}>
        Bán hàng tại quầy
      </Link>
    ),
  },
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
        key: "4g",
        icon: <i className="fa-solid fa-bars"></i>,
        label: (
          <Link className="text-decoration-none" to={"danh-muc"}>
            Danh mục
          </Link>
        ),
      },
      {
        key: "4h",
        icon: <GiConverseShoe />,
        label: (
          <Link className="text-decoration-none" to={"co-giay"}>
            Cổ giày
          </Link>
        ),
      },
    ],
  },
  {
    key: "1",
    icon: <i className="fa-solid fa-receipt"></i>,
    label: (
      <Link className="text-decoration-none" to={"phieu-giam-gia"}>
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
    label: "Quản Lý Tài Khoản",
    icon: <i className="fa-solid fa-users"></i>,
    children: [
      {
        key: "6a",
        
        label: (
          <Link className="text-decoration-none" to={"nhan-vien"}>
            Nhân Viên
          </Link>
        ),
      },
      {
        key: "6b",
       
        label: (
          <Link className="text-decoration-none" to={"khach-hang"}>
           Khách Hàng
          </Link>
        ),
      },
    ],
  },
  
];

function Sidebar() {
  return (
    <>
      <Menu className="custom-menu" theme="light" mode="inline" items={items} />
    </>
  );
}

export default Sidebar;
