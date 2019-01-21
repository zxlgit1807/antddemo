import React from 'react';
import { Card, Spin, Alert, Icon } from 'antd';

export default class MyLoading extends React.Component{

    render() {
        const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

        return(
            <div>
               <Card title="Spin用法">
                    <Spin size="small" />
                    <Spin />
                    <Spin size="large" />
                </Card>
                <Card title="内容遮罩">
                    <Spin tip="Loading...">
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="info"
                            />
                    </Spin>
                    <Spin tip="加载中...">
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="info"
                            />
                    </Spin>
                    <Spin tip="加载中..." indicator={antIcon}>
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="info"
                            />
                    </Spin>
                </Card>
                
            </div>
        );
    }
}