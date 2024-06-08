// src/components/modal/ModalBanHangThemSP.js
import React, { useState } from 'react';
import { Button, Modal, Input, Table } from 'antd';
import { sanPhamCTData } from '../../services/BanHangService';

const chiTietColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Ảnh", dataIndex: "url", key: "url" },
    { title: "Tên Sản Phẩm", dataIndex: "tenSanPham", key: "tenSanPham" },
    { title: "Giá Bán", dataIndex: "giaBan", key: "giaBan" },
    { title: "Số Lượng", dataIndex: "soLuong", key: "soLuong" },
    { title: "Kích Cỡ", dataIndex: "tenKichCo", key: "tenKichCo" },
    { title: "Màu Sắc", dataIndex: "tenMauSac", key: "tenMauSac" },
    { title: "Trạng Thái", dataIndex: "trangThai", key: "trangThai" },
    {
        title: "Action",
        key: "action",
        render: (text, record) => (
            <Button type="primary" >
                Thêm
            </Button>
        ),
    }
];

const ModalBanHang = () => {
    const [open, setOpen] = useState(false);
    const { data: spctData, isLoading } = sanPhamCTData();

    const showModal = () => setOpen(true);
    const hideModal = () => setOpen(false);

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Thêm sản phẩm
            </Button>
            <Modal
                centered
                visible={open}
                width={1300}
                closable={false}
                footer={null}
                maskClosable={true}
                onCancel={hideModal}
                bodyStyle={{ height: '80vh', overflowY: 'auto' }} // Tăng chiều cao của modal
            >
                <div className='h-[500px]'>
                    <div className='flex gap-5 mb-4'>
                        <Input className='w-[75%]' placeholder="Nhập tên sản phẩm" />
                        <Button type="primary">Tìm kiếm</Button>
                        <Button type="primary" danger>Làm mới</Button>
                    </div>
                    <Table
                        columns={chiTietColumns}
                        dataSource={spctData}
                        loading={isLoading}
                        rowKey="id"
                    />
                </div>
            </Modal>



        </>
    );
}

export default ModalBanHang;
