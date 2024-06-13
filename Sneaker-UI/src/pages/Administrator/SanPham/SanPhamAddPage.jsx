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
} from "antd";

function SanPhamAddPage() {
  const [loadData, setLoadData] = useState(false);
  const [disabledThongTin, setDisabledThongTin] = useState(false);
  const [dataListTable, setDataListTable] = useState([]);

  const [sanPhams, setSanPhams] = useState([]);
  const [chatLieus, setChatLieus] = useState([]);
  const [deGiays, setDeGiays] = useState([]);
  const [coGiays, setCoGiays] = useState([]);
  const [kichCos, setKichCos] = useState([]);
  const [mauSacs, setMauSacs] = useState([]);
  const [nhaSanXuats, setNhaSanXuats] = useState([]);
  const [thuongHieus, setThuongHieus] = useState([]);

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
                            mode="tags"
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
            <Button onClick={() => ThemSanPham()}>Tạo</Button>
          </Flex>
        </Card>
        <Card size="small" title={"Danh sách biến thể"}>
          {dataListTable.map((o, index) => (
            <Flex vertical key={index}>
              <Flex style={{ backgroundColor: "#d9dbdd" }} justify="start">
                <Typography.Title className="m-1" level={4}>
                  Các sản phẩm màu {findTenMauById(o[0]?.mauSac?.id)}
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

              <Flex justify="center">
                <Flex>
                  <UpLoadAnhSP lstCTSP={o} />
                </Flex>
              </Flex>
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
