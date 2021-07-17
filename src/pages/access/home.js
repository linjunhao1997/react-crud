import { Button } from 'antd';
import { Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';
const AccessHome = () => {
    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }


    return (
        <>
            <Button type="primary">同步代码接口到接口池</Button>
            <Tree
                showLine
                switcherIcon={<DownOutlined />}
                defaultExpandedKeys={['0-0-0']}
                onSelect={onSelect}
                treeData={[
                    {
                        title: '/api/v1',
                        key: '0',
                        children: [
                            {
                                title: '/TestPlans',
                                key: '0-0',
                                icon: () => {
                                    return <span>
                                        POST
                                    </span>
                                }

                            },
                            {
                                title: 'DELETE | /TestPlans/{id}',
                                key: '0-1',

                            },
                            {
                                title: 'DELETE | /TestPlans/_batch',
                                key: '0-2',
                            },
                        ],
                    },
                ]}
            />
        </>
    )
}

export default AccessHome