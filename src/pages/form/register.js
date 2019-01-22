import React from 'react';
import { Card, Form, Input, Icon, Radio, InputNumber, Select, Switch, DatePicker, TimePicker, Upload, uploadButton, Checkbox, Button, message } from 'antd';
import moment from 'moment';

class MyRegister extends React.Component {

    state = {
    }

    handleSubmit = ()=>{
        let userInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(userInfo))
        message.success(`${userInfo.userName} 恭喜你，您通过本次表单组件学习，当前密码为：${userInfo.userPwd}`)
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl => this.setState({
            userImg: imageUrl,
            loading: false,
          }));
        }
      }

    getBase64 = (img, callback)=> {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 2,
            }, 
            wrapperCol: {
                xs: 24,
                sm: 6,
              },
        }
        const offsetLayout = {
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:2
                }
            }
        }
        // textarea 宽高 
        const rowObject = { minRows: 2, maxRows: 6 }

        return(
            <div>
                <Card title="注册">
                    <Form>
                        <Form.Item label="用户名" {...formItemLayout}>
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
                        <Form.Item label="密码" {...formItemLayout}>
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
                        <Form.Item label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator('sex',{
                                    initialValue: "1",
                                })(
                                   <Radio.Group >
                                       <Radio value="1">男</Radio>
                                       <Radio value="2">女</Radio>
                                   </Radio.Group>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator('age',{
                                    initialValue: "18",
                                })(
                                   <InputNumber></InputNumber>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="当前状态" {...formItemLayout}>
                            {
                                getFieldDecorator('state',{
                                    initialValue: "2",
                                })(
                                    <Select>
                                        <Select.Option value="1">国家主席</Select.Option>
                                        <Select.Option value="2">亿万富翁</Select.Option>
                                        <Select.Option value="3">著名作家</Select.Option>
                                        <Select.Option value="4">国民偶像</Select.Option>
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="爱好" {...formItemLayout}>
                            {
                                getFieldDecorator('interest',{
                                    initialValue: ["2", "1"],
                                })(
                                    <Select mode="multiple">
                                        <Select.Option value="1">花钱</Select.Option>
                                        <Select.Option value="2">美女</Select.Option>
                                        <Select.Option value="3">上天</Select.Option>
                                        <Select.Option value="4">入地</Select.Option>
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="是否已婚" {...formItemLayout}>
                            {
                                getFieldDecorator('isMarred',{
                                })(
                                    <Switch defaultChecked></Switch>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="出生日期" {...formItemLayout}>
                            {
                                getFieldDecorator('birthday',{
                                    initialValue: moment('2018-8-10'),
                                })(
                                    <DatePicker/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator('address',{
                                    initialValue: '北京',
                                })(
                                    <Input.TextArea autosize={rowObject}></Input.TextArea>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="早起时间" {...formItemLayout}>
                            {
                                getFieldDecorator('time',{
                                })(
                                    <TimePicker/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="头像" {...formItemLayout}>
                            {
                                getFieldDecorator('userImg',{
                                })(
                                    <Upload listType="picture-card" showUploadList={false}
                                     action="//jsonplaceholder.typicode.com/posts/"
                                     onChange={this.handleChange}>
                                     {this.state.userImg ? <img src={this.state.userImg} alt="avatar" /> : <Icon type="plus"></Icon>}
                                    </Upload>
                                )
                            }
                        </Form.Item>
                        <Form.Item {...offsetLayout}>
                            {
                                getFieldDecorator('age')(
                                   <Checkbox>我已阅读过<a href="#">协议</a></Checkbox>
                                )
                            }
                        </Form.Item>
                        <Form.Item {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}
// 创建表单 ，不能在写为 export default class格式
export default Form.create()(MyRegister);