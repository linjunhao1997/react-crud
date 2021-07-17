import {Button, Form, Input, message, Modal} from "antd";
import {useStores} from "@/store";
import {insertNewRecord} from "@/utils/basefunc";
import {useObserver} from "mobx-react-lite";

const InsertModalComponent = () => {

    const {QuestionStore} = useStores()
    const [form] = Form.useForm()

    const insertSubmitAction = () => {
        insertNewRecord(`/api/question`, form.getFieldsValue())
            .then((resp) => {
                    if (resp.data.success) {
                        message.success({
                            content: resp.data.message,
                            className: 'custom-class',
                            style: {
                                marginTop: '20vh',
                            },
                        });
                        QuestionStore.refresh()
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
        <Modal
            bodyStyle={{maxHeight: '500px', overflowY: 'scroll'}}
            width={500}
            title="新增"
            centered
            visible={QuestionStore.insertModelVisible}
            onCancel={() => {
                QuestionStore.setInsertModelVisible(false)
            }}
            footer={
                <>
                    <Button key="yes" type="primary" onClick={insertSubmitAction}>
                        确认
                    </Button>
                    <Button key="no" onClick={() => {
                        QuestionStore.setInsertModelVisible(false)
                    }}>
                        取消
                    </Button>
                </>
            }>

            <Form form={form}
                  preserve={false}
                  layout="vertical"
                  name="update"
            >
                {FormItems}
            </Form>

        </Modal>
    ))
}

export default InsertModalComponent