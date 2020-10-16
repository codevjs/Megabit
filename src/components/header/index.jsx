import React from "react";
import {Layout, Menu} from "antd";
import {Link} from "react-router-dom";

const Header = () => {

    return (
        <Layout.Header>

            <div className="logo" />

            <Menu theme="dark" mode="horizontal">
                <Menu.Item key="1">
                    <Link to="/" >Home</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/profile">Profile</Link>
                </Menu.Item>
            </Menu>
        </Layout.Header>
    )
}

export default React.memo(Header);