import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import Router from "routes";
import firebase from "firebase/app";

const config = {
    apiKey: "AIzaSyARQD6xHbV1FwwulQpHoxDZwl_AYNNHxak",
    authDomain: "megabit-f6fbc.firebaseapp.com",
    databaseURL: "https://megabit-f6fbc.firebaseio.com",
    projectId: "megabit-f6fbc",
    storageBucket: "megabit-f6fbc.appspot.com",
    messagingSenderId: "132312694428",
    appId: "1:132312694428:web:9af26ec3bba59c1a797759"
};

// Initialize Firebase
firebase.initializeApp(config);

ReactDOM.render(
    <Router />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
