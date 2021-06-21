import {Descriptions} from 'antd'
import {useRequest} from 'ahooks'
import {useParams} from 'react-router-dom'
import React, {useEffect, useState} from 'react';

const QuestionDetail = () => {
    const { id } = useParams()
    const { data, error, loading } = useRequest({
        url: `/api/question/${id}`,
        method: 'get',
    })
    if (error) {
        return <div>failed to load</div>;
    }
    if (loading) {
        return <div>loading...</div>;
    }
    let result = data.data
    return (
        <div>
            // todo  如果是对象或者null不能直接输出
            <Descriptions title="问题详情">
               <Descriptions.Item label="question" key="question">{result["question"]}</Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default QuestionDetail