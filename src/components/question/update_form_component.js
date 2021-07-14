import {Form, Input} from "antd";
import {useRequest} from "ahooks";
import {getSingleData} from "@/utils/basefunc";
import React, {forwardRef, useImperativeHandle} from "react";
import {useStores} from "@/store";

const QuestionUpdateFormComponent = forwardRef((props, ref) => {

    const {QuestionStore} = useStores()

    const [form] = Form.useForm()

    useImperativeHandle(ref, () => ({
        getFormValue: () => {
            return form.getFieldsValue()
        }
    }))

    const {data, error, loading } = useRequest( `/api/question/${QuestionStore.currentQuestionRecord.id}`, {
        requestMethod: (service) => getSingleData(service)
    })


    if (error) {
        return <div>failed to load</div>;
    }
    if (loading) {
        return <div>loading...</div>;
    }

    form.setFieldsValue(data.data.data)


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

    return (
        <Form form={form}
              preserve={false}
              layout="vertical"
              name="update"
        >
            {FormItems}
        </Form>
    )

})

export default QuestionUpdateFormComponent