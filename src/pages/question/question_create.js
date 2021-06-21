import {Button, Col, Form, Input, message, Modal, Row, Space} from "antd";
import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import axios from "axios";
import {inject, observer} from "mobx-react";
import {useObserver} from "mobx-react-lite";

const QuestionCreate = (props) => {

    const [form] = Form.useForm()
    const {createSubmit$, refresh} = props

    const submit = () => {

        axios.post(`/api/question`, form.getFieldsValue())
            .then((resp) => {
                    if (resp.data.success) {
                        message.success({
                            content: resp.data.message,
                            className: 'custom-class',
                            style: {
                                marginTop: '20vh',
                            },
                        });
                        refresh()
                    } else {
                        message.error({
                            content: resp.data.message,
                            className: 'custom-class',
                            style: {
                                marginTop: '20vh',
                            },
                        });
                    }

                }
            ).catch(err => {
            console.log("resp:", err)
            if (err.response.data) {
                message.error({
                    content: err.response.data.message,
                    className: 'custom-class',
                    style: {
                        marginTop: '20vh',
                    },
                });
            }

        });
    }

    createSubmit$.useSubscription(() => {
        submit()
    })


    let FormItems = []
    let formItem = [{
        field: "question",
        dataType: "String",
        rule: [{
            required: true,
            message: '必须录入!',
        }]
    },
        {
            field: "answer",
            dataType: "String",
            rule: [{
                required: true,
                message: '必须录入!',
            }]}

    ]

    formItem.forEach((e, index) => {
        FormItems.push((
            <Form.Item key={index}
                       name={e.field}
                       label={e.field}
                       rules={e.rule}
            >
                <Input type="text"/>
            </Form.Item>
        ));
    })

    return useObserver(() => (

        <Form form={form}
              preserve={false}
              layout="vertical"
              name="update"
        >
            {FormItems}
        </Form>
    ))
}


export default inject('store')(observer(QuestionCreate))