import '@/App.css'
import React, {useState} from "react";
import {
    Route,
    Switch
} from 'react-router-dom'
import LoginPage from "@/pages/login/login_page";
import HomePage from "@/pages/home_page";

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
            <Switch>
                <Route path='/login' component={LoginPage} />
                <Route path='/' component={HomePage} extra />
            </Switch>
    );

}

export default App;
