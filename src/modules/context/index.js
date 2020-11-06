import React, {useState, useEffect} from 'react';
import {Spin} from "antd";
import firebase from "firebase/app";
import "firebase/auth";

export const Auth = React.createContext({
    authenticated : false,
    user : {}
});


// const userLevel = [1, 2, 3, 4, 5];

export const AuthProvider = ({children}) => {

    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser]                   = useState({});
    const [loading, setLoading]             = useState(false);

    useEffect(() => {

        setLoading(true);

        firebase.auth().onAuthStateChanged((info) => {

            if (info) {

                setUser(info);

                setAuthenticated(true);
            } else {

                setAuthenticated(false);
            }

            setLoading(false);
        })

    }, []);

    return (
        <Auth.Provider value={{ authenticated, user}}>
            {
                loading
                    ? <Spin spinning={true} tip={'Mencoba terhubung kerserver...'} />
                    : children
            }
        </Auth.Provider>
    )
}
