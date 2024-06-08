import React, { Component } from 'react';
import { Button, Modal, Input } from 'antd';

interface State {
    open: boolean;
}

const chiTietColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Ảnh", dataIndex: "url", key: "url" },
    { title: "Tên Sản Phẩm", dataIndex: "tenSanPham", key: "tenSanPham" },
    { title: "Giá Bán", dataIndex: "giaBan", key: "giaBan" },
    { title: "Số Lượng", dataIndex: "soLuong", key: "soLuong" },
    { title: "Kích Cỡ", dataIndex: "tenKichCo", key: "tenKichCo" },
    { title: "Màu Sắc", dataIndex: "tenMauSac", key: "tenMauSac" },
    { title: "Trạng Thái", dataIndex: "trangThai", key: "trangThai" }
];

class ModalBanHang extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            open: false,
        };
    }

    showModal = () => {
        this.setState({ open: true });
    };

    hideModal = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <>
                <Button type="primary" onClick={this.showModal}>
                    Thêm sản phẩm
                </Button>
                <Modal
                    // title="Modal 1000px width"
                    centered
                    visible={this.state.open}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                    width={1300}
                    closable={false}
                >
                    <div className='h-[500px]'>
                        <div className='flex gap-5'>
                            <Input className='w-[75%]' placeholder="Nhập tên sản phẩm" />
                            <Button type="primary">Tìm kiếm</Button>
                            <Button type="primary" danger>Làm mới</Button>


                        </div>

                    </div>
                </Modal>
            </>
        );
    }
}

export default ModalBanHang;
