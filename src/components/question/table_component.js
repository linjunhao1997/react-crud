import {React, useRef, useState} from 'react';
import {Button, Col, Form, Input, Row, Table, Select, Modal, message} from 'antd';
import {useAntdTable, useEventEmitter, useUpdateEffect} from 'ahooks';
import {
    ControlledMenu,
    MenuItem
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import {useHistory} from 'react-router';
import {useStores} from "@/store";
import {deleteSingleRecord, getTableData} from '@/utils/basefunc'
import {useObserver} from "mobx-react-lite";
import {QUESTION_RESOURCE} from "@/api/question";

const {Option} = Select;

const QuestionTableComponent = () => {
    let {QuestionStore} = useStores()
    const history = useHistory()
    const [isOpen, setOpen] = useState(false);
    const [anchorPoint, setAnchorPoint] = useState({x: 0, y: 0});
    const [currentRecord, setCurrentRecord] = useState(null);
    const updateSubmit$ = useEventEmitter()
    const createSubmit$ = useEventEmitter()

    const handleInsertClick = () => {
        QuestionStore.setInsertModelVisible(true)
    }

    const handleDetailClick = () => {

        history.push("/question/details/" + currentRecord.id)

    }

    const handleUpdateClick = () => {
        QuestionStore.setCurrentQuestionRecord(currentRecord)
        QuestionStore.setUpdateModelVisible(true)
    }

    const handleDeleteClick = () => {
        deleteSingleRecord(`${QUESTION_RESOURCE}/${currentRecord.id}`)
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

    const [form] = Form.useForm();

    const {tableProps, search, refresh} = useAntdTable(getTableData(`${QUESTION_RESOURCE}/_search`), {
        defaultPageSize: 5,
        form,
    });

    useUpdateEffect(() => {
        refresh()
        return () => {
            console.log('更新资源自动刷新table')
        }
    }, [QuestionStore.refreshTime]);


    const {pagination} = tableProps
    pagination.showTotal = (total) => {
        return `共 ${total} 条`;
    }
    pagination.showQuickJumper = true

    const {type, changeType, submit, reset} = search;

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
        },
        {
            title: 'question',
            dataIndex: 'question',
        },
        {
            title: 'answer',
            dataIndex: 'answer',
            sorter: {
                multiple: 1,
            }
        },
        {
            title: 'explanationPic',
            dataIndex: 'explanationPic',
            sorter: {
                multiple: 2,
            }

        },
    ];

    const advanceSearchForm = (
        <div>
            <Form form={form}>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item label="name" name="name">
                            <Input placeholder="name"/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="email" name="email">
                            <Input placeholder="email"/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="phone" name="phone">
                            <Input placeholder="phone"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="end">

                    <Form.Item style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button type="primary" onClick={submit}>
                            查询
                        </Button>
                        <Button onClick={reset} style={{marginLeft: 16}}>
                            重置
                        </Button>
                        <Button type="link" onClick={changeType}>
                            简单查询
                        </Button>
                    </Form.Item>
                </Row>
            </Form>
        </div>
    );

    const searchForm = (
        <div style={{marginBottom: 16}}>
            <Form form={form} style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Form.Item name="gender">
                    <Select style={{width: 120, marginRight: 16}} onChange={submit}>
                        <Option value="">all</Option>
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="question">
                    <Input.Search placeholder="enter question" style={{width: 240}} onSearch={submit}/>
                </Form.Item>
                <Button type="link" onClick={changeType}>
                    复杂查询
                </Button>
            </Form>
        </div>
    );

    return useObserver(() => (
        <div>
            <span hidden={true}>{QuestionStore.refreshTime}</span>
            <Button onClick={handleInsertClick}>
                新增
            </Button>
            <Button onClick={refresh}>
                刷新
            </Button>

            {type === 'simple' ? searchForm : advanceSearchForm}

            <Table
                columns={columns}
                rowKey="id"
                {...tableProps}
                onRow={record => {
                    return {
                        onContextMenu: e => {
                            e.preventDefault();
                            setAnchorPoint({x: e.clientX, y: e.clientY});
                            setOpen(true);
                            setCurrentRecord(record)
                        },
                    };
                }}/>
            <ControlledMenu anchorPoint={anchorPoint} isOpen={isOpen}
                            onClose={() => setOpen(false)}>
                <MenuItem onClick={handleDetailClick}>详情</MenuItem>
                <MenuItem onClick={handleUpdateClick}>修改</MenuItem>
                <MenuItem onClick={handleDeleteClick}>删除</MenuItem>
            </ControlledMenu>
        </div>
    ));
};

export default QuestionTableComponent