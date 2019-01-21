import React from 'react';
import { Card, Button, notification } from 'antd';

export default class MyNotice extends React.Component{

    openNotification=(type, direction) =>{
        if(direction) {
            notification.config({
                placement: direction
            });
        }
        
        notification[type]({
            message: '发工资了',
            description: "才发了一块钱",
        });
    }

    render() {
        return(
            <div>
                <Card title="通知提醒框">
                    <Button type="primary" onClick={()=>this.openNotification('success')}>success</Button>
                    <Button type="primary" onClick={()=>this.openNotification('info')}>info</Button>
                    <Button type="primary" onClick={()=>this.openNotification('warning')}>warning</Button>
                    <Button type="primary" onClick={()=>this.openNotification('error')}>error</Button>
                </Card>
                <Card title="通知提醒框-位置控制">
                    <Button type="primary" onClick={()=>this.openNotification('success', 'topLeft')}>success</Button>
                    <Button type="primary" onClick={()=>this.openNotification('info', 'topRight')}>info</Button>
                    <Button type="primary" onClick={()=>this.openNotification('warning', 'bottomLeft')}>warning</Button>
                    <Button type="primary" onClick={()=>this.openNotification('error', 'bottomRight')}>error</Button>
                </Card>
            </div>
        );
    }
}