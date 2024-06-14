import React, { useEffect, useState } from "react";
import SanPhamService from "../../../services/SanPhamService/SanPhamService";
import ChatLieuService from "../../../services/SanPhamService/ChatLieuService";
import DeGiayService from "../../../services/SanPhamService/DeGiayService";
import CoGiayService from "../../../services/SanPhamService/CoGiayService";
import KichCoService from "../../../services/SanPhamService/KichCoService";
import MauSacService from "../../../services/SanPhamService/MauSacService";
import NhaSanXuatService from "../../../services/SanPhamService/NhaSanXuatService";
import ThuongHieuService from "../../../services/SanPhamService/ThuongHieuService";
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
} from "antd";
import { v4 as uuidv4 } from "uuid";

function SanPhamAddPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [loadData, setLoadData] = useState(false);
  const [disabledThongTin, setDisabledThongTin] = useState(false);

  const [sanPhams, setSanPhams] = useState([]);
  const [chatLieus, setChatLieus] = useState([]);
  const [deGiays, setDeGiays] = useState([]);
  const [coGiays, setCoGiays] = useState([]);
  const [kichCos, setKichCos] = useState([]);
  const [mauSacs, setMauSacs] = useState([]);
  const [nhaSanXuats, setNhaSanXuats] = useState([]);
  const [thuongHieus, setThuongHieus] = useState([]);

  const randomChuoi = () => {
    const randomString = uuidv4().replace(/-/g, "").substring(0, 6);
    return randomString;
  };

  const [defaultChiTietSP, setDefaultChiTietSP] = useState({
    giaBan: 100000,
    soLuong: 10,
    ma: "",
    moTa: "",
    trangThai: 1,
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
      title: "Số lượng",
      dataIndex: "soLuong",
      width: 150,
      render: (text, record, index) => (
        <InputNumber
          style={{ width: "100%" }}
          min={0}
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
            defaultValue={record?.giaBan}
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
                  <Row gutter={[20, 20]}>
                    <Col span={24}>
                      <Row gutter={[5, 5]}>
                        <Col span={24}>
                          <Typography.Text>Tên sản phẩm: </Typography.Text>
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
                </Col>
                <Col span={24}>
                  <Row gutter={[20, 20]}>
                    <Col span={12}>
                      <Row gutter={[5, 5]}>
                        <Col span={24}>
                          <Typography.Text>Cổ giày: </Typography.Text>
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
                          <Typography.Text>Đế giày: </Typography.Text>
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
                </Col>
                <Col span={24}>
                  <Row gutter={[20, 20]}>
                    <Col span={12}>
                      <Row gutter={[5, 5]}>
                        <Col span={24}>
                          <Typography.Text>Thương hiệu: </Typography.Text>
                        </Col>
                        <Col span={24}>
                          <Select
                            disabled={disabledThongTin}
                            style={{ width: "100%" }}
                            placeholder="Chọn thương hiệu"
                            onChange={(e) =>
                              setDefaultChiTietSP({
                                ...defaultChiTietSP,
                                thuongHieu: { id: e },
                              })
                            }
                          >
                            {thuongHieus?.map((th, index) => (
                              <Select.Option key={index} value={th?.id}>
                                {th?.ten}
                              </Select.Option>
                            ))}
                          </Select>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={12}>
                      <Row gutter={[5, 5]}>
                        <Col span={24}>
                          <Typography.Text>Chất liệu: </Typography.Text>
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
                </Col>
              </Row>
              <br />
              <Row gutter={[5, 5]}>
                <Col span={24}>
                  <Typography.Text>Mô tả: </Typography.Text>
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
              {/*  */}
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
            <Button>Thêm sản phẩm</Button>
          </Flex>
        </Card>
      </Space>
    </>
  );
}

export default SanPhamAddPage;
