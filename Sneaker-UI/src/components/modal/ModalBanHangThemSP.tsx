import React, { Component } from 'react';
import { Button, Modal } from 'antd';

interface State {
    open: boolean;
}

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
                    title="Modal 1000px width"
                    centered
                    visible={this.state.open}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                    width={1300}
                >
                    <div className='h-[500px]'>
                        <p>some contents...</p>
                        <p>some contents...</p>
                        <p>some contents...</p>
                    </div>
                </Modal>
            </>
        );
    }
}

export default ModalBanHang;
