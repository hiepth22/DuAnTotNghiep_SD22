import React, { useState, useEffect } from "react";
import { Button, Tabs, Table } from "antd";
import BanHangService, {
  hoaDonData,
  hoaDonChiTietDataByIdHD,
} from "../../../services/BanHangService";
import { toast } from "react-toastify";
import ModalBanHang from "../../../components/modal/ModalBanHangThemSP";

const { TabPane } = Tabs;

const chiTietColumns = [
  { title: "STT", dataIndex: "stt", key: "stt" },
  {
    title: "Ảnh",
    dataIndex: "tenAnh",
    key: "tenAnh",
    render: (text, record) => (
      <img src={buildCloudinaryUrl(record.tenAnh)} style={{ width: 50, height: 50 }} />
    )
  },
  { title: "Tên Sản Phẩm", dataIndex: "tenSanPham", key: "tenSanPham" },
  { title: "Kích Cỡ", dataIndex: "kichCo", key: "kichCo" },
  { title: "Màu Sắc", dataIndex: "mauSac", key: "mauSac" },
  { title: "Số Lượng", dataIndex: "soLuong", key: "soLuong" },
  { title: "Giá Bán", dataIndex: "gia", key: "gia" },
  { title: "Trạng Thái", dataIndex: "trangThai", key: "trangThai" }
];

const buildCloudinaryUrl = (publicId) => {
  const cloudName = 'deapopcoc';  // Thay bằng tên cloud của bạn
  return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;
};


const BanTaiQuayPage: React.FC = () => {
  const [tabState, setTabState] = useState<{
    activeKey: string;
    items: { label: string; key: string; children: JSX.Element }[];
  }>({
    activeKey: "1",
    items: [],
  });

  const { isPending, data: initialHoaDonData } = hoaDonData();

  useEffect(() => {
    if (initialHoaDonData && initialHoaDonData.length > 0) {
      const tabs = initialHoaDonData.slice(0, 10).map((hoaDon, index) => ({
        label: `Hóa Đơn ${index + 1}`,
        key: `${hoaDon.id}`,
        children: <HoaDonChiTietTab idHoaDon={hoaDon.id} />,
      }));

      setTabState({
        activeKey: tabs[0].key,
        items: tabs,
      });
    }
  }, [initialHoaDonData]);

  const onChange = (key: string) => {
    setTabState((prevState) => ({
      ...prevState,
      activeKey: key,
    }));
  };

  const CreateHD = () => {
    if (tabState.items.length >= 10) {
      toast.warning("Không thể tạo thêm hóa đơn. Số lượng hóa đơn đã đạt tối đa.");
      return;
    }

    const hoaDonDataAdd = {
      // nhanVien: { id: 1 },
      khachHang: { id: 1 },
      nguoiTao: "system",
      trangThai: "1"
    };

    BanHangService.add(hoaDonDataAdd)
      .then((res) => {
        const newHoaDon = res.data;
        toast.success("Thêm hóa đơn thành công");

        const newTab = {
          label: `Hóa Đơn ${newHoaDon.id}`,
          key: `${newHoaDon.id}`,
          children: <HoaDonChiTietTab idHoaDon={newHoaDon.id} />,
        };

        setTabState(prevState => ({
          activeKey: `${newHoaDon.id}`,
          items: [...prevState.items, newTab],
        }));
      })
      .catch((err) => {
        toast.warning("Thêm thất bại");
        console.log(err);
      });
  };

  const remove = (targetKey: string) => {
    let newActiveKey = tabState.activeKey;
    let lastIndex = -1;
    tabState.items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = tabState.items.filter(
      (item) => item.key !== targetKey
    );
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setTabState({
      activeKey: newActiveKey,
      items: newPanes,
    });
  };

  const onEdit = (
    e: any,
    action: "add" | "remove"
  ) => {
    if (typeof e === "string") {
      if (action === "add") {
        CreateHD();
      } else {
        remove(e);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="font-sans flex">
          Bán Hàng Tại Quầy
        </div>
        <div className="mr-4 mt-6 flex">
          <Button onClick={CreateHD} >+ Tạo Hóa Đơn</Button>
        </div>
      </div>

      <div>
        <Tabs
          hideAdd
          onChange={onChange}
          activeKey={tabState.activeKey}
          type="editable-card"
          onEdit={onEdit}
        >
          {tabState.items.map((item) => (
            <TabPane
              tab={item.label}
              key={item.key}
              closable={item.key !== "1"}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="flex justify-start items-start">
                    Danh sách sản phẩm
                  </p>
                </div>
                <div className="mb-3 flex justify-end">
                  <ModalBanHang idHoaDon={parseInt(item.key)} />
                </div>
              </div>
              {item.children}
            </TabPane>
          ))}
        </Tabs>
      </div>

    </div>
  );
};

const HoaDonChiTietTab: React.FC<{ idHoaDon: number }> = ({ idHoaDon }) => {
  const { isPending, data } = hoaDonChiTietDataByIdHD(idHoaDon);


  const dataSource = data?.map((item, index) => ({
    ...item,
    stt: index + 1,
  })) || [];

  return (
    <Table
      dataSource={dataSource}
      columns={chiTietColumns}
      loading={isPending}
      rowKey="id"
    />
  );
};

export default BanTaiQuayPage;
