import {Button, Col, Form, Input, message, Modal, Row, Space} from "antd";
import React, {forwardRef, useImperativeHandle, useMemo, useRef, useState} from "react";
import axios from "axios";
import {useObserver} from "mobx-react-lite";
import {useStores} from "@/store";

const QuestionUpdate = (props) => {

    const {QuestionStore} = useStores()
    const [form] = Form.useForm()
    const {updateSubmit$, refresh} = props
    form.setFieldsValue(QuestionStore.currentQuestionRecord)
    const submit = () => {
        axios.patch(`/api/question/${QuestionStore.currentQuestionRecord.id}`, form.getFieldsValue())
            .then((resp) => {
                    if (resp.data.success) {
                        message.success({
                            content: resp.data.message,
                            className: 'custom-class',
                            style: {
                                marginTop: '20vh',
                            },
                        });
                        QuestionStore.setCurrentQuestionRecord(resp.data)
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
            ).catch(resp => {
            console.log(resp)
            if (resp.data) {
                message.error({
                    content: resp.data.message,
                    className: 'custom-class',
                    style: {
                        marginTop: '20vh',
                    },
                });
            }
        })
    }

    updateSubmit$.useSubscription(() => {
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
    }]

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


export default QuestionUpdate