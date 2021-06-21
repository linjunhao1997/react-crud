import { Breadcrumb  } from 'antd';
import { useLocation }from 'react-router-dom';
import React from "react";

//具体导航的名称
const map = {
    '/user':'用户管理',
    '/user/user_info':'用户信息',
    '/user/user_info1':'用户信息1',

    '/question': '试题',
    '/question/table': '问题列表',
}

const RoutePath = () => {
    const pathSnippets = useLocation().pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;    
        return (
          <Breadcrumb.Item key={url}>
               {map[url]}
          </Breadcrumb.Item>
        );
      });

      return <Breadcrumb>{extraBreadcrumbItems}</Breadcrumb>
}

export default RoutePath
