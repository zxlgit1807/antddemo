import React from 'react';
import { Card, Form, Input, Icon } from 'antd';

class MyRegister extends React.Component {

    render() {
        const { getFieldDecorator } = this.props.form;

        return(
            <div>
                <Card title="注册">
                    <Form style={{width:300}}>
                        <Form.Item label="用户名">
                            {
                                getFieldDecorator('userName',{
                                    initialValue: '',
                                    rules: [
                                        {
                                            required:true,
                                            message:'用户名不能为空',
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user"/>} placeholder="输入用户名"/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="密码">
                            {
                                getFieldDecorator('userPwd',{
                                    initialValue: '',
                                    rules: [
                                        {
                                            required:true,
                                            message:'密码不能为空',
                                        }
                                    ]
                                })(
                                    <Input type="password" prefix={<Icon type="lock"/>} placeholder="输入密码"/>
                                )
                            }
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}
// 创建表单 ，不能在写为 export default class格式
export default Form.create()(MyRegister);