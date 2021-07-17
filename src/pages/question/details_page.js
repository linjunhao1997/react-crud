import {Descriptions} from 'antd'
import {useRequest} from 'ahooks'
import {useParams} from 'react-router-dom'
import React from 'react';
import {getSingleData} from '@/utils/basefunc'
import {QUESTION_RESOURCE} from "@/api/question";
const QuestionDetailPage = () => {
    const { id } = useParams()
    const { data, error, loading } = useRequest( `${QUESTION_RESOURCE}/${id}`, {
        requestMethod: (service) => getSingleData(service)
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

export default QuestionDetailPage