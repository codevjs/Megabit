import React from "react";
import {Button, Layout, Menu} from "antd";
import {Link} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth"

const Header = () => {

    const signout  = async () => {

        await firebase.auth().signOut();
    }

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
                <Menu.Item key="3">
                    <Link to="/login">Login</Link>
                </Menu.Item>

                <Menu.Item key="4">
                    <Button onClick={() => signout()}>Logout</Button>
                </Menu.Item>
            </Menu>
        </Layout.Header>
    )
}

export default React.memo(Header);