import React, { useEffect, useState } from "react";
import SanPhamService from "../../../services/SanPhamService/SanPhamService";
import ChatLieuService from "../../../services/SanPhamService/ChatLieuService";
import DeGiayService from "../../../services/SanPhamService/DeGiayService";
import CoGiayService from "../../../services/SanPhamService/CoGiayService";
import KichCoService from "../../../services/SanPhamService/KichCoService";
import MauSacService from "../../../services/SanPhamService/MauSacService";
import NhaSanXuatService from "../../../services/SanPhamService/NhaSanXuatService";
import ThuongHieuService from "../../../services/SanPhamService/ThuongHieuService";
import SanPhamChiTietService from "../../../services/SanPhamService/SanPhamChiTietService";
import {
  Table,
  Space,
  Card,
  Flex,
  Typography,
  Row,
  Col,
  Select,
  Button,
  Input,
  InputNumber,
  Modal,
} from "antd";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import formatPrice from "../../../utils/FormatPrice";

function SanPhamAddPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [loadData, setLoadData] = useState(false);
  const [disabledThongTin, setDisabledThongTin] = useState(false);
  const navigate = useNavigate();

  const [sanPhams, setSanPhams] = useState([]);
  const [chatLieus, setChatLieus] = useState([]);
  const [deGiays, setDeGiays] = useState([]);
  const [coGiays, setCoGiays] = useState([]);
  const [kichCos, setKichCos] = useState([]);
  const [mauSacs, setMauSacs] = useState([]);
  const [nhaSanXuats, setNhaSanXuats] = useState([]);
  const [thuongHieus, setThuongHieus] = useState([]);

  const randomChuoi = () => {
    const randomString = uuidv4().replace(/-/g, "").substring(0, 5);
    return randomString;
  };

  const [defaultChiTietSP, setDefaultChiTietSP] = useState({
    giaBan: 500000,
    soLuong: 1,
    ma: "",
    moTa: "",
    trangThai: 1,
    canNang: 400,
    anh: null,
    sanPham: { id: null },
    chatLieu: { id: null },
    deGiay: { id: null },
    coGiay: { id: null },
    kichCo: { id: null },
    mauSac: { id: null },
    nhaSanXuat: { id: null },
    thuongHieu: { id: null },
  });

  const xoaChiTietSanPham = (record, index) => {
    let ds = danhSachSanPhamChiTiet.filter((o, ind) => o.key != record.key);
    setDanhSachSanPhamChiTiet([...ds]);
  };

  const [selectMauSac, setSelectMauSac] = useState([]);
  const [selectKichCo, setSelectKichCo] = useState([]);
  const [danhSachSanPhamChiTiet, setDanhSachSanPhamChiTiet] = useState([]);
  const [dataListTable, setDataListTable] = useState([]);

  useEffect(() => {
    let ds = nhomTheoMau([...danhSachSanPhamChiTiet]);
    setDataListTable([...ds]);
  }, [danhSachSanPhamChiTiet]);

  const nhomTheoMau = (ds) => {
    const groups = ds.reduce((acc, object) => {
      const group = (acc[object?.mauSac?.id] ??= []);
      group.push(object);
      return acc;
    }, {});

    const groupArray = Object.values(groups);
    return groupArray;
  };

  useEffect(() => {
    const getData = async () => {
      let resSanPhams = await SanPhamService.getAll();
      let resChatLieus = await ChatLieuService.getAll();
      let resDeGiays = await DeGiayService.getAll();
      let resCoGiays = await CoGiayService.getAll();
      let resKichCos = await KichCoService.getAll();
      let resMauSacs = await MauSacService.getAll();
      let resNhaSanXuats = await NhaSanXuatService.getAll();
      let resThuongHieus = await ThuongHieuService.getAll();

      setSanPhams(resSanPhams);
      setChatLieus(resChatLieus);
      setDeGiays(resDeGiays);
      setCoGiays(resCoGiays);
      setKichCos(resKichCos);
      setMauSacs(resMauSacs);
      setNhaSanXuats(resNhaSanXuats);
      setThuongHieus(resThuongHieus);
    };
    getData();
  }, [loadData]);

  const findMauSacById = (id) => {
    let mau = mauSacs.find((o) => o.id === id);
    return mau?.ten;
  };

  const themSanPham = () => {
    setDisabledThongTin(true);

    let sanPham = sanPhams.find((o) => o.id == defaultChiTietSP.sanPham.id);

    const danhSachSPCT = [];

    let danhSachKichCo = [...selectKichCo];
    let danhSachMauSac = [...selectMauSac];

    for (const color of danhSachMauSac) {
      for (const size of danhSachKichCo) {
        let mauSac = mauSacs.find((o) => o.id == color);
        let kichCo = kichCos.find((o) => o.id == size);
        let check = danhSachSanPhamChiTiet.find(
          (o) => o.mauSac.id == color && o.kichCo.id == size
        );
        if (check) {
          continue;
        }

        danhSachSPCT.push({
          ...defaultChiTietSP,
          key: uuidv4().substring(0, 3),
          ten: `${sanPham.ten} (color : ${mauSac.ten} - size : ${kichCo.ten})`,
          ma: `SP00${sanPham.id}${mauSac.id}${kichCo.id}${randomChuoi()}`,
          mauSac: { id: color },
          kichCo: { id: size },
        });
      }
    }

    let ds = [...danhSachSPCT, ...danhSachSanPhamChiTiet];
    setDanhSachSanPhamChiTiet([...ds]);
  };

  const handleSanPhamChiTiet = async () => {
    if (danhSachSanPhamChiTiet.length < 1) {
      toast.warning("Thiếu dữ liệu");
      return;
    }

    Modal.confirm({
      title: "Xác nhận",
      content: "Thêm mới sản phẩm?",
      onOk: async () => {
        try {
          const promises = danhSachSanPhamChiTiet.map(async (o) => {
            let { key, ...object } = o;
            object.sanPham = { id: defaultChiTietSP.sanPham.id };
            object.mauSac = { id: object.mauSac.id };
            object.kichCo = { id: object.kichCo.id };

            await SanPhamChiTietService.add(object);
          });

          await Promise.all(promises);
          toast.success("Thêm mới sản phẩm thành công");

          setTimeout(() => {
            navigate("/admin/san-pham");
          }, 1000);
        } catch (err) {
          toast.error("Thất bại", err.message);
        }
      },
      onCancel: () => {
        console.log("Hủy bỏ hành động thêm sản phẩm");
      },
    });
  };

  const updateSoLuong = (record, index, e) => {
    setDanhSachSanPhamChiTiet((pre) => {
      record.soLuong = e;
      pre.splice(index, 1, record);
      return pre;
    });
  };

  const updateGiaBan = (record, index, e) => {
    setDanhSachSanPhamChiTiet((pre) => {
      record.giaBan = e;
      pre.splice(index, 1, record);
      return pre;
    });
  };

  const updateCanNang = (record, index, e) => {
    setDanhSachSanPhamChiTiet((pre) => {
      record.canNang = e;
      pre.splice(index, 1, record);
      return pre;
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Mã",
      dataIndex: "ma",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "ten",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Cân nặng",
      dataIndex: "canNang",
      width: 120,
      render: (text, record, index) => (
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          defaultValue={record?.canNang}
          step={100}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "g"
          }
          parser={(value) => value.replace(/[^\d]/g, "")}
          onChange={(value) => updateCanNang(record, index, value)}
        />
      ),
    },

    {
      title: "Số lượng",
      dataIndex: "soLuong",
      width: 80,
      render: (text, record, index) => (
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          step={5}
          defaultValue={record?.soLuong}
          onChange={(e) => updateSoLuong(record, index, e)}
        />
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "giaBan",
      width: 150,
      render: (text, record, index) => (
        <>
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            step={100000}
            defaultValue={record?.giaBan}
            formatter={(value) => `${formatPrice(value)}`}
            parser={(value) => value.replace(/\D/g, "")}
            onChange={(e) => updateGiaBan(record, index, e)}
          />
        </>
      ),
    },
    {
      title: "Hành động",
      render: (_, record, index) => (
        <Space>
          <Button type="text">
            <i className="fa-regular fa-pen-to-square"></i>
          </Button>
          <Button type="text" onClick={() => xoaChiTietSanPham(record, index)}>
            <i className="fa-solid fa-trash"></i>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Card size="small">
          <Flex align="center" justify="center">
            <Typography.Title level={4}>Thông tin sản phẩm</Typography.Title>
          </Flex>
          <Row justify="center">
            <Col span={24}>
              <Row gutter={[20, 20]}>
                <Col span={24}>
                  <Row gutter={[5, 5]}>
                    <Col span={24}>
                      <Typography.Text strong>Tên sản phẩm: </Typography.Text>
                    </Col>
                    <Col span={24}>
                      <Select
                        disabled={disabledThongTin}
                        style={{ width: "100%" }}
                        placeholder="Chọn tên sản phẩm"
                        onChange={(e) =>
                          setDefaultChiTietSP({
                            ...defaultChiTietSP,
                            sanPham: { id: e },
                          })
                        }
                      >
                        {sanPhams?.map((de, index) => (
                          <Select.Option key={index} value={de?.id}>
                            {de?.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row gutter={[20, 20]}>
                <Col span={12}>
                  <Row gutter={[5, 5]}>
                    <Col span={24}>
                      <Typography.Text strong>Cổ giày: </Typography.Text>
                    </Col>
                    <Col span={24}>
                      <Select
                        disabled={disabledThongTin}
                        style={{ width: "100%" }}
                        placeholder="Cổ giày"
                        onChange={(e) =>
                          setDefaultChiTietSP({
                            ...defaultChiTietSP,
                            coGiay: { id: e },
                          })
                        }
                      >
                        {coGiays?.map((cg, index) => (
                          <Select.Option key={index} value={cg?.id}>
                            {cg?.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row gutter={[5, 5]}>
                    <Col span={24}>
                      <Typography.Text strong>Đế giày: </Typography.Text>
                    </Col>
                    <Col span={24}>
                      <Select
                        disabled={disabledThongTin}
                        style={{ width: "100%" }}
                        placeholder="Chọn đế giày"
                        onChange={(e) =>
                          setDefaultChiTietSP({
                            ...defaultChiTietSP,
                            deGiay: { id: e },
                          })
                        }
                      >
                        {deGiays?.map((dg, index) => (
                          <Select.Option key={index} value={dg?.id}>
                            {dg?.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row gutter={[20, 20]}>
                <Col span={12}>
                  <Row gutter={[5, 5]}>
                    <Col span={24}>
                      <Typography.Text strong>Nhà sản xuất: </Typography.Text>
                    </Col>
                    <Col span={24}>
                      <Select
                        disabled={disabledThongTin}
                        style={{ width: "100%" }}
                        placeholder="Chọn thương hiệu"
                        onChange={(e) =>
                          setDefaultChiTietSP({
                            ...defaultChiTietSP,
                            nhaSanXuat: { id: e },
                          })
                        }
                      >
                        {nhaSanXuats?.map((nsx, index) => (
                          <Select.Option key={index} value={nsx?.id}>
                            {nsx?.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row gutter={[5, 5]}>
                    <Col span={24}>
                      <Typography.Text strong>Chất liệu: </Typography.Text>
                    </Col>
                    <Col span={24}>
                      <Select
                        disabled={disabledThongTin}
                        style={{ width: "100%" }}
                        placeholder="Chọn chất liệu"
                        onChange={(e) =>
                          setDefaultChiTietSP({
                            ...defaultChiTietSP,
                            chatLieu: { id: e },
                          })
                        }
                      >
                        {chatLieus?.map((cl, index) => (
                          <Select.Option key={index} value={cl?.id}>
                            {cl?.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row gutter={[20, 20]}>
                <Col span={24}>
                  <Row gutter={[5, 5]}>
                    <Col span={24}>
                      <Typography.Text strong>Mô tả: </Typography.Text>
                    </Col>
                    <Col span={24}>
                      <Input.TextArea
                        value={defaultChiTietSP.moTa}
                        onChange={(e) =>
                          setDefaultChiTietSP({
                            ...defaultChiTietSP,
                            moTa: e.target.value,
                          })
                        }
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Card size="small">
          <Flex align="center" justify="center">
            <Typography.Title level={4}>Màu sắc và kích cỡ</Typography.Title>
          </Flex>
          <Row justify="center">
            <Col span={20}>
              <Row gutter={[20, 20]}>
                <Col span={12}>
                  <Row gutter={[5, 5]}>
                    <Col span={24}>
                      <Typography.Text strong>Màu sắc: </Typography.Text>
                    </Col>
                    <Col span={20}>
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Chọn màu sắc"
                        mode="multiple"
                        onChange={(e) => setSelectMauSac(e)}
                      >
                        {mauSacs?.map((sp, index) => (
                          <Select.Option key={index} value={sp?.id}>
                            {sp?.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Col>
                    <Col span={4}>
                      <Button>
                        <i className="fa-solid fa-plus"></i>
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row gutter={[5, 5]}>
                    <Col span={24}>
                      <Typography.Text strong>Kích cỡ: </Typography.Text>
                    </Col>
                    <Col span={20}>
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Chọn kích cỡ"
                        onChange={(e) => {
                          setSelectKichCo(e);
                        }}
                      >
                        {kichCos?.map((sp, index) => (
                          <Select.Option key={index} value={sp?.id}>
                            {sp?.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Col>
                    <Col span={4}>
                      <Button>
                        <i className="fa-solid fa-plus"></i>
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Flex justify="end">
            <Button onClick={() => themSanPham()}>Tạo</Button>
          </Flex>
        </Card>
        <Card size="small" title={"Danh sách biến thể"}>
          {dataListTable.map((o, index) => (
            <Flex vertical key={index}>
              <Flex style={{ backgroundColor: "#d9dbdd" }} justify="start">
                <Typography.Title className="m-1" level={4}>
                  Các sản phẩm màu {findMauSacById(o[0]?.mauSac?.id)}
                </Typography.Title>
              </Flex>
              <Table
                columns={columns}
                dataSource={o}
                key={"key"}
                pagination={false}
                bordered
              />
              <br />
            </Flex>
          ))}
          <br />
          <Flex justify="end">
            <Button onClick={() => handleSanPhamChiTiet()}>
              Thêm sản phẩm
            </Button>
          </Flex>
        </Card>
      </Space>
    </>
  );
}

export default SanPhamAddPage;
