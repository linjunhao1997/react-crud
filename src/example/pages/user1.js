import {React, useState} from 'react';
import { Button, Col, Form, Input, Row, Table, Select, Modal, Descriptions } from 'antd';
import { useAntdTable } from 'ahooks';
import {
    ControlledMenu,
    MenuItem
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { PaginatedParams } from 'ahooks/lib/useAntdTable';
import { sorter2s } from '@/lib/antd/sorter2s'
import { useHistory, useLocation } from 'react-router';
const { Option } = Select;

interface Item {
    name: {
        last: string;
    };
    email: string;
    phone: string;
    gender: 'male' | 'female';
}

interface Result {
    total: number;
    list: Item[];
}

let sorters = {}

const getTableData = (

    { current, pageSize,sorter }: PaginatedParams[0],
    formData: Object,
): Promise<Result> => {

    let query = `page=${current}&size=${pageSize}`;
    Object.entries(formData).forEach(([key, value]) => {
        if (value) {
            query += `&${key}=${value}`;
        }
    });

    sorters = sorter2s(sorter, sorters)
    console.log(sorters)
    return fetch(`https://randomuser.me/api?results=55&${query}`)
        .then((res) => res.json())
        .then((res) => ({
            total: res.info.results,
            list: res.results,
        }));
};

const User1 = () => {
    const history = useHistory()
    const location = useLocation()
    const [isOpen, setOpen] = useState(false);
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [currentRecord, setCurrentRecord] = useState(null);
    const [modelState, setModelState] = useState({
        title: "",
        visible: false
    })
    const handleCreateClick = () => {
        
    }

    const handleDetailClick = () => {
      
        history.push("/user/user_info1/123456")

    }

    const handleUpdateClick = () => {
        setModelState({
            title: '修改',
            visible: true
           }
        )
    }

    const handleDeleteClick = () => {
        
    }

    const handleCancelClick = () => {
        setModelState({
            visible: false
           }
        )
    }

    const [form] = Form.useForm();

    const { tableProps, search } = useAntdTable(getTableData, {
        defaultPageSize: 5,
        form,
    });
   
    const { pagination } = tableProps
    pagination.showTotal = (total) => {
        return `共 ${total} 条`;
    }
    pagination.showQuickJumper = true

    const { type, changeType, submit, reset } = search;

    const columns = [
        {
            title: 'name',
            dataIndex: ['name', 'last'],
        },
        {
            title: 'email',
            dataIndex: 'email',
        },
        {
            title: 'phone',
            dataIndex: 'phone',
            sorter: {
                multiple: 1,
            }
        },
        {
            title: 'gender',
            dataIndex: 'gender',
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
                            <Input placeholder="name" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="email" name="email">
                            <Input placeholder="email" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="phone" name="phone">
                            <Input placeholder="phone" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="end">
            
                    <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type="primary" onClick={submit}>
                            查询
                        </Button>
                        <Button onClick={reset} style={{ marginLeft: 16 }}>
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
        <div style={{ marginBottom: 16 }}>
            <Form form={form} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Form.Item name="gender">
                    <Select style={{ width: 120, marginRight: 16 }} onChange={submit}>
                        <Option value="">all</Option>
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="name">
                    <Input.Search placeholder="enter name" style={{ width: 240 }} onSearch={submit} />
                </Form.Item>
                <Button type="link" onClick={changeType}>
                    复杂查询
                </Button>
            </Form>
        </div>
    );

  
    const modal = (
        <div>
            <Modal
          title={modelState.title}
          visible={modelState.visible}
          onOk={()=>{}}
          onCancel={handleCancelClick}
          okText="确认"
          cancelText="取消"
        >
          <p>{modelState.visible?currentRecord.gender:null}</p>
        </Modal>
        </div>
    )

    return (
        <div>
            {type === 'simple' ? searchForm : advanceSearchForm}
            <Table 
                columns={columns} 
                rowKey="email" 
                {...tableProps} 
                onRow={record => {
                    return {
                      onContextMenu: e => {
                        console.log(record)
                        e.preventDefault();
                        setAnchorPoint({ x: e.clientX, y: e.clientY });
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
            {modal}
        </div>

       
    );
};

export default User1