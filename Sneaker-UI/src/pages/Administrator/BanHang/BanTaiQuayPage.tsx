import React, { useRef, useState, useEffect, MouseEvent } from "react";
import { Button, Tabs, Modal, Table } from "antd";
import BanHangService, {
  hoaDonData,
  hoaDonChiTietDataByIdHD,
} from "../../../services/BanHangService";
import { toast } from "react-toastify";
import getDateNow from "../../../utils/GetDateNow";
import ModalBanHang from "../../../components/modal/ModalBanHangThemSP";

const { TabPane } = Tabs;

const chiTietColumns = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Ảnh", dataIndex: "url", key: "url" },
  { title: "Tên Sản Phẩm", dataIndex: "ten", key: "ten" },
  { title: "Kích Cỡ", dataIndex: "kich_co", key: "kich_co" },
  { title: "Màu Sắc", dataIndex: "mau_sac", key: "mau_sac" },
  { title: "Số Lượng", dataIndex: "soLuong", key: "soLuong" },
  { title: "Giá Bán", dataIndex: "giaBan", key: "giaBan" },
  { title: "Trạng Thái", dataIndex: "trangThai", key: "trangThai" }
];

const BanTaiQuayPage: React.FC = () => {
  const [hoaDonData1, setHoaDonData] = useState([]);
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
        label: `Hóa Đơn ${index + 1}`,  // Đánh số tab từ 1 đến 10
        key: `${index + 1}`,
        children: <HoaDonChiTietTab idHoaDon={hoaDon.id} />,
      }));

      setTabState({
        activeKey: "1",
        items: tabs,
      });
      setHoaDonData(initialHoaDonData);
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
      toast.warning("Không thể tạo thêm hóa đơn. Số lượng tab đã đạt tối đa.");
      return;
    }

    const hoaDonDataAdd = {
      nhanVien: {
        id: 1
      },
      khachHang: {
        id: 1
      },
      nguoiTao: "system",
      trangThai: "1"
    };

    BanHangService.add(hoaDonDataAdd)
      .then((res) => {
        const newHoaDon = res.data;
        toast.success("Thêm hóa đơn thành công");
        console.log(newHoaDon.id);

        const newTab = {
          label: `Hóa Đơn ${tabState.items.length + 1}`,
          key: `${tabState.items.length + 1}`,
          children: <HoaDonChiTietTab idHoaDon={newHoaDon.id} />,
        };

        setTabState(prevState => ({
          activeKey: `${tabState.items.length + 1}`,
          items: [...prevState.items, newTab],
        }));

        return BanHangService.add2(newHoaDon);
      })
      .then((res) => {
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


      <div >
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
                  <ModalBanHang />
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

  return (
    <Table
      dataSource={data}
      columns={chiTietColumns}
      loading={isPending}
      rowKey="id"
    />
  );
};

export default BanTaiQuayPage;
