import { MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Layout, Row, Image } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";
import Sidebar from "../../components/Sidebar/Sidebar";

function LayoutAdmin() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <>
            <Layout>
                <Sider
                    collapsed={collapsed}
                    theme="light"
                    width={320}
                    className="custom-menu"
                    style={{
                        position: "sticky",
                        overflow: "auto",
                        height: "100vh",
                        top: 0,
                        bot: 0,
                        left: 0,
                    }}
                >
                    <div className="demo-logo-vertical">
                        <Image
                            preview={false}
                            src="https://pendecor.vn/uploads/files/2023/08/15/thiet-ke-logo-shop-giay-3.jpg"
                        />
                        <hr className="m-0" />
                    </div>
                    <Sidebar />
                </Sider>
                <Layout>
                    <Header className="bg-white p-0 opacity-75">
                        <Row justify={"space-between"} align={"middle"}>
                            <Col span={12}>
                                <div className="header-collapse">
                                    <MenuUnfoldOutlined
                                        onClick={() => setCollapsed(!collapsed)}
                                        style={{ cursor: "pointer" }}
                                    />
                                </div>
                            </Col>
                            <Col span={12}>
                                <Row justify={"end"}>
                                    <Avatar
                                        icon={<UserOutlined />}
                                        style={{ cursor: "pointer" }}
                                    />
                                </Row>
                            </Col>
                        </Row>
                    </Header>
                    <Content
                        style={{
                            padding: 12,
                            minHeight: "100vh",
                            background: "#f0f2f5",
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}

export default LayoutAdmin;
