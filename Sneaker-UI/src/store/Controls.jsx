import React, { useState } from "react";
import { Modal, Button } from "antd";
import useBearStore from "../store/useBearStore";

const Controls = () => {
    const [open, setOpen] = useState(false);

    const increasePopulation = useBearStore(
        (state) => state.increasePopulation
    );

    const removeAllBears = useBearStore((state) => state.removeAllBears);

    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Count
            </Button>
            <Modal
                centered
                visible={open}
                width={200}
                closable={false}
                footer={null}
                maskClosable={true}
                onCancel={hideModal}
                bodyStyle={{ height: "80vh", overflowY: "auto" }}
            >
                <div>
                    <Button onClick={increasePopulation}>one up</Button>
                    <Button onClick={removeAllBears}>reset</Button>
                </div>
            </Modal>
        </div>
    );
};

export default Controls;
