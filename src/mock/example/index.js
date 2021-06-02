import Mock from 'mockjs';

export const userList = (current, pageSize) =>
  Mock.mock({
    total: 55,
    [`list|${pageSize}`]: [
      {
        id: '@guid',
        name: '@cname',
        'gender|1': ['male', 'female'],
        email: '@email',
        disabled: false,
      },
    ],
});
