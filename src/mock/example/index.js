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

export const getUser = (id) => {
  Mock.mock(`/mock/api/user/${id}`, "get", {
    
      id: `${id}`,
      name: '@cname',
      'gender|1': ['male', 'female'],
      email: '@email',
      disabled: false,
  })
}

export const data = Mock.mock("/mock/user/123456","get",
  //"/mock"是通过ajax获取数据时填写的地址，可以随意写。但要和ajax请求时填写的地址一致。
 {   			//生成四个如下格式的数据
		"id|+1":1, 						//数字从1开始，后续依次加1
		"name":"@cname",			//名字为随机中文名
		"age|18-28":25, 			//年龄是18-28之间的随机数
	}
)

