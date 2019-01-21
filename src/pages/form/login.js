import React from 'react';
import { Card, Form, Input, Button, message, Icon, Checkbox } from 'antd';
/**
 * 登录
 */
class MyLogin extends React.Component {

    handleSummit=()=> {
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values)=>{
            if(!err){
                message.success(`${userInfo.userName} 恭喜你，进入我的世界`)
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        return(
            <div>
                <Card title="登录内联表单">
                    <Form layout="inline">
                        <Form.Item>
                            <Input placeholder="输入用户名"/>
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="输入密码"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary">登录</Button>
                        </Form.Item>
                    </Form>
                </Card>

                <Card title="水平表单">
                    <Form style={{width:300}}>
                        <Form.Item>
                            {
                                getFieldDecorator('userName',{
                                    initialValue: '',
                                    rules: [
                                        {
                                            required:true,
                                            message:'用户名不能为空',
                                        },{
                                            min:5,max:10,
                                            message:'长度不在范围内'
                                        },{
                                            pattern:new RegExp('^\\w+$','g'),
                                            message:'用户名必须为字母或者数字'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user"/>} placeholder="输入用户名"/>
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                        {
                                getFieldDecorator('userPwd',{
                                })(
                                    <Input prefix={<Icon type="lock" />} type="password" placeholder="输入密码"/>
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName:'checked',
                                    initialValue: true
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }
                            <a href="#" style={{float:'right'}}>忘记密码</a>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.handleSummit}>登录</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }

}
// 创建表单 ，不能在写为 export default class格式
export default Form.create()(MyLogin);