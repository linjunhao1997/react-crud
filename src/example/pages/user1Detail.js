import {Descriptions} from 'antd'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import React, {useEffect, useState} from 'react';

const User1Detail = () => {
    const {id} = useParams()
    const list = []
    let [data, setData] = useState({})
    useEffect(() => {
        axios.get('/mock/user/123456', {dataType: 'json'}) //这列的'/mock'与mock.js文件里的地址一致
            .then(res => {
                console.log(res.data)
                setData(res.data)
            })
    }, [])
    console.log("id:", id)



    console.log("list:", list)

    return (
        <div>
            <Descriptions title="用户详情">
                <Descriptions.Item label="hehe">hehe</Descriptions.Item>
                {console.log("return", data)}
                {Object.keys(data).map((field) => <Descriptions.Item label={field} key={field}>{data[field]}</Descriptions.Item>)}
            </Descriptions>
        </div>
    )
}

export default User1Detail