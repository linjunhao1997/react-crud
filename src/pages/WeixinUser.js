import {Card, Table, Button, Popconfirm, Modal, message, Space, Input, DatePicker, Form, Row, Col} from 'antd';
import axios from 'axios';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React, { useState,useEffect,useRef,forwardRef, useCallback } from 'react'
import moment from 'moment';
const { confirm } = Modal;
const { Search } = Input;
const { RangePicker } = DatePicker;






function WeixinUser() {
    const modal = useRef(null);

    const [data, setData] = useState({});
    const [detail, setDetail] = useState({nickname: "no"});
    const [selectedRowKeys, setSelectedRowKeys ] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState(true);
    const [deleteOp, setDeleteOp] = useState(0);
    const [keyword, setKeyword] = useState(new String(""));
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchDate, setSearchDate] = useState({beginDate: null, endDate: null});
    const [insertFormModalVisible, setInsertFormModalVisible] = useState(false);
    const [insertOp, setInsertOp] = useState(0);
    const [modalButton, setModalButton] = useState( () => {
        return (
            <>
                <Button key="yes" type="primary" onClick={() => { onCreate(form.getFieldsValue())}}>
                    确认
                </Button>,
                <Button key="no" onClick={() => { onCancel()}}>
                    取消
                </Button>,
                <Button key="update" onClick={() => { onUpdate()}}>
                    修改
                </Button>
            </>

        )
    })
    const onUpdate = function() {
        setModalButton(() => {
            return (
                <>
                    <Button key="yes" type="primary" onClick={() => { onCreate(form.getFieldsValue())}}>
                        确认
                    </Button>,
                    <Button key="no" onClick={() => { onCancel()}}>
                        取消
                    </Button>,
                </>

            )
        })
    }

    const [form] = Form.useForm();

    const formItem = [{
        field: "nickname",
        dataType: "String",
        rule: [ {
            required: true,
            message: '必须录入!',
        }]
    },{
        field: "province",
        dataType: "String",
        rule: [ {
            required: true,
            message: '必须录入!',
        }]
    }]

    const  getDetail = function(id) {
        return axios.get('http://127.0.0.1:8888/xproject/weixinUser/' + id)
            .then((resp) => {
                if (resp.data.code == 200) {
                    //setDetail(resp.data.data);
                    form.setFieldsValue(resp.data.data)
                    console.log(resp.data.data);

                    setInsertFormModalVisible(true);
                } else {
                    message.error({
                        content: '查询失败',
                        className: 'custom-class',
                        style: {
                            marginTop: '20vh',
                        },
                    });
                }
            }).catch( err => {
                message.error({
                    content: '异常错误',
                    className: 'custom-class',
                    style: {
                        marginTop: '20vh',
                    },
                })
            })
    }

    const listByPage = function(page, pageSize) {
        setPage(page)
        setPageSize(pageSize)
        axios.post('http://127.0.0.1:8888/xproject/weixinUser/list', { page: page, rows: pageSize, keyword: keyword, beginDate: searchDate.beginDate, endDate: searchDate.endDate})
            .then((resp) => {
                console.log(resp.data.data);
                setData(resp.data.data);
                if (resp.data.data.records.length === 0 && page === 1) {
                    setPagination(false)
                } else if (resp.data.data.records.length === 0 && page > 1) {
                    console.log("进来减1")
                    setPage(--page)
                }
                if (resp.data.total > 0) {
                    setPagination(true)
                } else {
                    setPagination(false)
                }
                setSearchLoading(false)
            });
    }

    const deleteRecordsPromise = function(ids) {
        return axios.delete('http://127.0.0.1:8888/xproject/weixinUser', {data: ids})
            .then((resp) => {
                if (resp.data.code == 200) {
                    message.success({
                        content: '删除成功',
                        className: 'custom-class',
                        style: {
                            marginTop: '20vh',
                        },
                    });
                    setDeleteOp(deleteOp + 1);
                    //listByPage(page, pageSize)
                    console.log(page);
                } else {
                    message.error({
                        content: '删除失败',
                        className: 'custom-class',
                        style: {
                            marginTop: '20vh',
                        },
                    });
                }
            }).catch( err => {
                    message.error({
                        content: '异常错误',
                        className: 'custom-class',
                        style: {
                            marginTop: '20vh',
                        },
                    })
            })
    }



    const deleteConfirm = function(ids) {
        console.log(ids);
        confirm({
            title: '确定删除？',
            icon: <ExclamationCircleOutlined />,
            content: '删除之后无法撤回，请谨慎选择！',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteRecordsPromise(ids).then(r => console.log("success"))
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    useEffect(() => {
        listByPage(page, pageSize)
    },[deleteOp, insertOp])

    useEffect(() => {
        setPage(1);
        listByPage(page, pageSize)
        console.log("现在" + page)
    },[keyword,searchDate, pageSize])


    const columns = [
        {
            title: '昵称',
            width: 100,
            dataIndex: 'nickname',
            key: 'nickname',
            fixed: 'left',
            align: 'center'
        },
        {
            title: '省份',
            width: 100,
            dataIndex: 'province',
            key: 'province',
            align: 'center'

        },
        {
            title: '头像',
            dataIndex: 'headimgurl',
            key: 'headimgurl',
            width: 150,
            render: (headimgurl) => <img src={headimgurl}></img>,
            align: 'center'

        },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (record) => {
                return(
                    <div>
                        <Button type='primary' size='small' onClick={() => getDetail(record.id)}>详情</Button>
                        <Button style={{margin: '0 1rem'}} type='primary' size='small'>修改</Button>
                        <Button style={{margin: '0 1rem'}} type='danger' size='small' onClick={() => deleteConfirm(new Array(record.id))}>删除</Button>
                    </div>
                )
            },
            align: 'center'

        },
    ];
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: changableRowKeys => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            }
        ],
    };



    const onCancel = function() {
        setInsertFormModalVisible(false);
        form.resetFields();
    }
    const onCreate = (formData) => {
        console.log('Received values of form: ', formData);
        return axios.post('http://127.0.0.1:8888/xproject/weixinUser', formData)
            .then((resp) => {
                if (resp.data.code == 200) {
                    message.success({
                        content: '新增成功',
                        className: 'custom-class',
                        style: {
                            marginTop: '20vh',
                        },
                    });
                    setInsertOp(insertOp + 1)
                    // listByPage(page, pageSize)
                    console.log(page);

                } else {
                    message.error({
                        content: '新增失败',
                        className: 'custom-class',
                        style: {
                            marginTop: '20vh',
                        },
                    });
                }
            }).catch( err => {
            message.error({
                content: '异常错误',
                className: 'custom-class',
                style: {
                    marginTop: '20vh',
                },
            })
        })
    };

    const layout = {
        labelCol: { span: 8},
        wrapperCol: { span: 16}
    };
    const tailLayout = {
        wrapperCol: {offset: 8, span: 16}
    }
    const FormItems = [];
    formItem.forEach((e) => {
        FormItems.push((
            <Form.Item
                name={e.field}
                label={e.field}
                rules={e.rule}
            >
                <Input type="text" />
            </Form.Item>
        ));
    })

    return (
        <>
            <Card title="微信用户" extra={[
                <Button key='1' type="primary" size="small" onClick={() => setInsertFormModalVisible(true)}>新增</Button>,
                <Button key='2' type="danger" size="small" onClick={() => {deleteConfirm(selectedRowKeys.map((currentValue,index,arr) => {return arr[index]}))}}>删除</Button>]
            }>
                <Space>
                    <Search placeholder="请输入搜索关键字" allowClear loading={searchLoading} onSearch ={(keyword) => {setSearchLoading(true);setKeyword(new String(keyword))}}/>
                    <RangePicker
                        ranges={{
                            Today: [moment(), moment()],
                            '本月': [moment().startOf('month'), moment().endOf('month')],
                        }}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        onChange={(dates, dateStrings) => {setSearchDate({
                            ...searchDate,
                            beginDate: dateStrings[0], endDate: dateStrings[1]
                        })}}
                    />
                </Space>
                <Space>
                <Table
                    rowSelection={rowSelection}
                    bordered
                    columns={columns}
                    dataSource={data.records}
                    scroll={{ x: 1000, y: 800 }}
                    rowKey={record => record.id}
                    pagination={{pagination}?
                        {
                            total: data.total,
                            current: data.page,
                            defaultPageSize: pageSize,
                            defaultCurrent: 1,
                            onChange: listByPage,
                            showQuickJumper: true,
                            showSizeChanger: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} 共 ${total} 条`
                        } :false}/>
                </Space>
                <Modal
                    bodyStyle={{maxHeight: '500px', overflowY: 'scroll'}}
                    width={500}
                    title="新增"
                    centered
                    visible={insertFormModalVisible}
                    destroyOnClose={false}
                    onCancel={()=>onCancel()}
                    footer={

                        <Row>
                            <Col span={8} offset={8}>
                                <Space>
                                    {modalButton}
                                </Space>
                            </Col>
                        </Row>

                    }
                >
                    <Form form={form}
                        {...layout}
                        preserve={false}
                        layout="vertical"
                        name="form_in_modal"
                        onFinish={onCreate}
                    >
                        {FormItems}
                    </Form>
                </Modal>
            </Card>
        </>
    )
}
export default  WeixinUser