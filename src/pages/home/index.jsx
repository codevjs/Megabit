import React from "react";
import { Layout, Breadcrumb } from 'antd';
import {Header, Footer} from "components";
const { Content } = Layout;

const Home  = () => {

    return (

        <Layout>

            <Header />

            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>

                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                </Breadcrumb>

                <div
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: 380 }}
                >
                    Ini Halaman Home
                </div>

            </Content>

            <Footer />

        </Layout>
    )
}

export default Home;