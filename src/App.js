import '@/App.css';
import {Layout, Menu, PageHeader} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

import React, {useState} from "react";
import SettingOutlined from "@ant-design/icons/lib/icons/SettingOutlined";
import AppstoreOutlined from "@ant-design/icons/lib/icons/AppstoreOutlined";
import {
    Route,
    Link, Switch
} from 'react-router-dom'
import User from "@/example/pages/user";
import User1 from "@/example/pages/user1";
import User1Detail from "@/example/pages/user1Detail";
import QuestionTable from "@/pages/question/question_table"
import RoutePath from '@/lib/antd/path'
import QuestionDetail from "@/pages/question/question_detail";

const {Header, Sider, Content, Footer} = Layout;
const {SubMenu} = Menu;

const App = () => {
    const [state, setState] = useState({
        collapsed: false,
    })

    const toggle = () => {
        setState({
            collapsed: !state.collapsed
        })
    }

    const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    const [openKeys, setOpenKeys] = React.useState([]);
    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    }

    return (
            <Layout>
                <Sider trigger={null}
                       collapsible
                       collapsed={state.collapsed}
                       style={{
                           overflow: 'auto',
                           height: '100vh',
                       }}
                       width={256}
                       theme="light">

                    <div className="logo"/>
                    <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange}>
                        <SubMenu key="sub1" icon={<UserOutlined/>} title="用户">
                            <Menu.Item key="1">
                                <Link to="/user/user_info">用户示例</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/user/user_info1">用户示例1</Link>
                            </Menu.Item>

                            <Menu.Item key="4">Option 4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<AppstoreOutlined/>} title="试题">
                            <Menu.Item key="5">
                                <Link to="/question/table">列表</Link>
                            </Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                            <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="7">Option 7</Menu.Item>
                                <Menu.Item key="8">Option 8</Menu.Item>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu key="sub4" icon={<SettingOutlined/>} title="Navigation Three">
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
               
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}>
                        {React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                            style: {
                                marginLeft: '2vh'
                            }
                        })}
                    </Header>
                  
                    
                    <div className="site-page-header-ghost-wrapper">
                    <PageHeader ghost={false}>
                    <RoutePath></RoutePath>
                    </PageHeader>
                    </div>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '14px 14px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Switch>
                            <Route path="/user/user_info">
                                <User />
                            </Route>
                            <Route path="/user/user_info1" exact>
                                <User1 />
                            </Route>
                            <Route path="/user/user_info1/:id" component={User1Detail}/>
                            <Route path="/question/table" exact>
                                <QuestionTable />
                            </Route>
                            <Route path="/question/table/:id" component={QuestionDetail}/>

                        </Switch>
                     
                    </Content>
                  
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2021 Created by voice244</Footer>
                </Layout>
               
            </Layout>
    );

}

export default App;
