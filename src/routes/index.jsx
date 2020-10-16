import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {Spin} from "antd";

const Home   = React.lazy(() => import("../pages/home"));
const Profile = React.lazy(() => import("../pages/profile"));

const Router = () => {

    return (
        <React.Suspense fallback={<Spin size="large" />} >
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/"} component={Home} />
                    <Route path={"/profile"} component={Profile} />
                </Switch>
            </BrowserRouter>
        </React.Suspense>
    )
}

export default Router;