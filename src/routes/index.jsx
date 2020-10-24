import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {Spin} from "antd";
import { context as Auth } from "modules";
import AuthRoute from "./authRoute";

const Home   = React.lazy(() => import("../pages/home"));
const Profile = React.lazy(() => import("../pages/profile"));
const Login  = React.lazy(() => import("../pages/login"));

const Router = () => {

    return (
        <Auth.AuthProvider>
            <React.Suspense fallback={<Spin size="large" />} >
                <BrowserRouter>
                    <Switch>
                        <AuthRoute exact path={"/"} component={Home} />
                        <AuthRoute path={"/profile"} component={Profile} />
                        <Route path={"/login"} component={Login} />
                    </Switch>
                </BrowserRouter>
            </React.Suspense>
        </Auth.AuthProvider>
    )
}

export default Router;