import {Button, message, Modal} from "antd";
import {useRef, useState} from "react";
import {useStores} from "@/store";
import QuestionUpdateFormComponent from "@/components/question/update_form_component";
import {updateSingleRecord} from "@/utils/basefunc";
import {useObserver} from "mobx-react-lite";

const UpdateModalComponent = () => {

    const questionUpdateFormComponentRef = useRef()

    const {QuestionStore} = useStores()

    const [visible, setVisible] = useState(false)

    const updateSubmitAction = () => {
        updateSingleRecord(`/api/question/${QuestionStore.currentQuestionRecord.id}`,  questionUpdateFormComponentRef.current.getFormValue())
            .then((resp) => {
                    if (resp.data.success) {
                        message.success({
                            content: resp.data.message,
                            className: 'custom-class',
                            style: {
                                marginTop: '20vh',
                            },
                        });
                        QuestionStore.setCurrentQuestionRecord(resp.data.data)
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
            ).catch(resp => {
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

    return useObserver(() => (
        <>
            <Modal
                forceRender={true}
                bodyStyle={{maxHeight: '500px', overflowY: 'scroll'}}
                width={500}
                title="修改"
                centered
                visible={QuestionStore.updateModelVisible}
                onCancel={() => {
                    QuestionStore.setUpdateModelVisible(false)
                }}
                footer={
                    <>
                        <Button key="yes" type="primary" onClick={updateSubmitAction}>
                            确认
                        </Button>
                        <Button key="no" onClick={() => {
                            QuestionStore.setUpdateModelVisible(false)
                        }}>
                            取消
                        </Button>
                    </>
                }>

                {QuestionStore.updateModelVisible?<QuestionUpdateFormComponent ref={questionUpdateFormComponentRef}/>:<div></div>}

            </Modal>
        </>
    ))

}

export default UpdateModalComponent