import {Descriptions} from 'antd'
import axios from 'axios'
import { useRequest } from 'ahooks';
import { useParams }from 'react-router-dom'
import { useState } from 'react';
const User1Detail = () => {
    const { id } = useParams()
    const list = []
    let data = {}
    console.log("id:",id)
    axios.get('/mock/user/123456', {dataType:'json'}) //这列的'/mock'与mock.js文件里的地址一致
     .then(res=>{
console.log(res.data)
    data = res.data
    Object.keys(data).forEach((field, index) => {
        console.log(field)
       list.push((<Descriptions.Item label={field}>{data[field]}</Descriptions.Item>))
   })
})

    
     console.log("list:",list)
    
    return (
        <div>
            <Descriptions title="用户详情">
            {list}
            </Descriptions>
        </div>
    )
}

export default User1Detail