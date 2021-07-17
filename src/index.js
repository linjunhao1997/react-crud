import React from 'react';
import './index.css'
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import zhCN from 'antd/lib/locale/zh_CN';
import {ConfigProvider, Modal} from 'antd';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Provider} from "mobx-react";
import store from "@/store/QuestionStore";


ReactDOM.render(
    /*<React.StrictMode>*/
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <BrowserRouter>
               <App/>
            </BrowserRouter>
        </Provider>
    </ConfigProvider>,
    /*</React.StrictMode>,*/
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
