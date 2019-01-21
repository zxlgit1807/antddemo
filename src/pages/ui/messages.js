import React from 'react';
import { Card, Button, message } from 'antd';

export default class MyMessages extends React.Component{

    showMessage=(type)=>{
        message[type]('工资不发了');
    }

    render() {
        return(
            <div>
                <Card title="全局提示框">
                    <Button onClick={()=>this.showMessage('success')}>Success</Button>
                    <Button onClick={()=>this.showMessage('error')}>Error</Button>
                    <Button onClick={()=>this.showMessage('warning')}>Warning</Button>
                    <Button onClick={()=>this.showMessage('info')}>info</Button>
                </Card>
            </div>
        );
    }
}