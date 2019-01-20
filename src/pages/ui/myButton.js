import React from 'react';
import { Card, Button, Radio } from 'antd';
import './ui.css';

export default class MyButton extends React.Component{

    state = {
        loading: true,
        size:'default'
    }
    oncloseLoading= ()=> {
        this.setState({
            loading: false
        })
    }

    handleChange =(e)=>{
        this.setState({
            size:e.target.value
        })
    }

    render() {
        return(
            <div>
                <Card title="基础按钮">
                    <Button type="primary">点击</Button>
                    <Button>Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="danger">Danger</Button>
                    <Button disabled>Danger</Button>
                </Card>
                <Card title="图形按钮">
                    <Button icon="plus">点击</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button shape="circle" icon="search"></Button>
                    <Button type="primary" icon="search">搜索</Button>
                    <Button icon="download">下载</Button>
                </Card>
                <Card title="Loading按钮">
                    <Button type="primary" loading={this.state.loading}>确定</Button>
                    <Button type="primary" shape="circle" loading={this.state.loading}/>
                    <Button loading={this.state.loading}>点击加载</Button>
                    <Button shape="circle" loading={this.state.loading}/>
                    <Button type="primary" onClick={this.oncloseLoading}>关闭</Button>
                </Card>
                <Card title="按钮组">
                    <Button.Group>
                        <Button type="primary" icon="left">确定</Button>
                        <Button type="primary" icon="right">确定</Button>
                    </Button.Group>
                </Card>
                <Card title="按钮尺寸">
                    <Radio.Group value={this.state.size} onChange={this.handleChange}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="lagre">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>确定</Button>
                </Card>
            </div>
        )
    }
}