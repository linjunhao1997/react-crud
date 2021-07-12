import axios from 'axios'
import {BrowserRouter} from 'react-router-dom'

const ROUTER = new BrowserRouter()


const BASE_REQUEST = axios


BASE_REQUEST.interceptors.request.use(config => {

    config.headers.Authorization = "Bearer " + localStorage.getItem('token');

    return config
})

BASE_REQUEST.interceptors.response.use( resp => {
    const { status }  = resp.data;

    if ( status === 401 ) {
        localStorage.removeItem('token');
        ROUTER.history.push('/login')
    }
    return resp

}, error => {
    if (error.response) {
        if (error.response.data) {
            console.log(error.response.data)
            // ...
        }
    } else if (error.request) {
        console.log(error.request);
        // ...
    } else {
        console.log('Error', error.message);
        // ...
    }
    return Promise.reject(error)
})


export { BASE_REQUEST }