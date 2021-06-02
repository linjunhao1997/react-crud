
import React from 'react';
import { useRequest } from 'ahooks';
import { Table, Button } from 'antd';
import { userList } from '@/mock/example/index'
interface UserListItem {
    id: string;
    name: string;
    gender: 'male' | 'female';
    email: string;
    disabled: boolean;
}

async function getUserList(params: {
  current: number;
  pageSize: number;
  gender?: string;
}): Promise<{ total: number; list: UserListItem[] }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userList(params.current, params.pageSize));
    }, 1000);
  });
}

const User = () => {
  const { tableProps, params, refresh } = useRequest(
    ({ current, pageSize, sorter: s, filters: f }) => {
      const p: any = { current, pageSize };
      if (s?.field && s?.order) {
        p[s.field] = s.order;
      }
      if (f) {
        Object.entries(f).forEach(([filed, value]) => {
          p[filed] = value;
        });
      }
      console.log(p);
      return getUserList(p);
    },
    {
      paginated: true,
      defaultPageSize: 5,
    },
  );

  // you can read sorter and filters from params[0]
  const { sorter = {}, filters = {} } = params

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'id',
      dataIndex: 'id',
      sorter: true,
      sortOrder: sorter.field === 'id' ? sorter.order : false,
    },
    {
      title: 'gender',
      dataIndex: 'gender',
      filters: [
        { text: 'male', value: 'male' },
        { text: 'female', value: 'female' },
      ],
      filteredValue: filters.gender,
    },
  ];

  return (
    <div>
      <Button onClick={refresh} style={{ marginBottom: 16 }}>
        刷新
      </Button>
      <Table columns={columns} rowKey="id" {...tableProps} />
    </div>
  );
};
  
export default User