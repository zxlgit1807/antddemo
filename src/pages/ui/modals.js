import React from 'react';
import { Card, Button, Modal } from 'antd';

export default class MyButton extends React.Component{

    state ={
        show1: false,
        show2: false,
        show3: false,
        show4: false
    }
    // 中括号包起来，会变成变量
    handleOpen= (type)=>{
        this.setState({
            [type]: true,
        });

    }

    handleConfirm= (type)=> {
        Modal[type]({
            title:"确定",
            content: "确定要滚蛋么",
            onOk(){
                console.log("ok")
            },onCancel(){
                console.log("quit")
            }
        })
    }
/// 加上 ()=>表示只有点击时才会触发
    render() {
        return(
            <div>
                
                <Card title="基础弹框">
                    <Button type="primary" onClick={()=>this.handleOpen('show1')}>默认</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('show2')}>自定义页脚</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('show3')}>顶部20px弹框</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('show4')}>水平垂直居中</Button>
                </Card>

                <Card title="信息确认">
                    <Button type="primary" onClick={()=>this.handleConfirm('confirm')}>默认</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('info')}>info</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('success')}>success</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('warning')}>warning</Button>
                </Card>


                <Modal teile="react" visible={this.state.show1} onCancel={()=>{
                    this.setState({
                        show1:false
                    })
                }}>
                    欢迎来到我的世界
                </Modal>

                <Modal teile="react" visible={this.state.show2} okText="好的" cancelText="滚吧" onCancel={()=>{
                    this.setState({
                        show2:false
                    })
                }}>
                    欢迎来到我的世界
                </Modal>

                <Modal teile="react" visible={this.state.show3} style={{top:20}} onCancel={()=>{
                    this.setState({
                        show3:false
                    })
                }}>
                    欢迎来到我的世界
                </Modal>

                <Modal teile="react" visible={this.state.show4} wrapClassName="vertical-center-modal" onCancel={()=>{
                    this.setState({
                        show4:false
                    })
                }}>
                    欢迎来到我的世界
                </Modal>
            </div>
        )
    }
}