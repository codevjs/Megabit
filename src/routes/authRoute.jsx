import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import { context } from "modules";

const AuthRoute = ({ component : Component , ...rest  }) => {

    const { authenticated } = useContext(context.Auth);

    return (
        <Route
            {...rest}
            render={props => {
                return authenticated
                    ? <Component {...props} />
                    : <Redirect to={"/login"}/>
            }}
        />
    )
};

export default AuthRoute;
