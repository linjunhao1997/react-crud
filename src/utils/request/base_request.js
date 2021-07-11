import axios from 'axios'
import { BASE_URL } from "@/utils/env/base_url";
import {BrowserRouter} from 'react-router-dom'
import {message} from "antd";

const ROUTER = new BrowserRouter()

const BASE_REQUEST = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {'content-type': 'application/json'}
})

BASE_REQUEST.interceptors.request.use(config => {

    const { url } = config

    const excludeUrls = ["/api/sys/auth"]

    for (let i = 0 ; i < excludeUrls.length; i++) {
        if (!url.startsWith(excludeUrls[i])) {
            if ( i != excludeUrls.length - 1) {
                continue
            } else {
                return config.headers.Authorization = "Bearer " + localStorage.getItem('token');
            }
        }
    }

    return config
})

BASE_REQUEST.interceptors.response.use( resp => {
    const { status }  = resp.data;

    if ( status === 401 ) {
        localStorage.removeItem('token');
        ROUTER.history.push('/api/sys/auth')
    }
    return resp

}, error => {
    if (error.response) {
        if (error.response.data) {
            console.log(error.response.data)
            message.error({
                content: error.response.data.message,
                className: 'custom-class',
                style: {
                    marginTop: '20vh',
                },
            });
        }
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log('Error', error.message);
    }
})


export { BASE_REQUEST }