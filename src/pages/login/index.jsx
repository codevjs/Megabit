import React, {useContext, useState} from "react";
import {Layout, Breadcrumb, Form, Input, Button, notification, Spin} from 'antd';
import {Header, Footer} from "components";
import {Redirect} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import {context} from "modules";
const { Content } = Layout;

const Login  = () => {

    const [loading, setLoading] = useState(false);

    const {authenticated} = useContext(context.Auth)

    const onFinish = async (value) => {

        try {

            setLoading(true)

            await firebase.auth().signInWithEmailAndPassword(value.email, value.password);


        } catch (e) {

            notification["info"]({
                message : "Gagal login",
                description : e.message
            })
        } finally {

            setLoading(false)
        }
    }

    return authenticated
        ? <Redirect to={"/profile"} />
        : (
            <Layout>

                <Header />

                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>

                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Login</Breadcrumb.Item>
                    </Breadcrumb>

                    <div
                        className="site-layout-background"
                        style={{ padding: 24, minHeight: 380 }}
                    >
                        <Spin spinning={loading}>
                            <Form
                                layout={"vertical"}
                                name="basic"
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item >
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>

                                <Form.Item >
                                    <Button type="primary" htmlType="button">
                                        Login with google
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Spin>
                    </div>

                </Content>

                <Footer />

            </Layout>
    )
}

export default Login;