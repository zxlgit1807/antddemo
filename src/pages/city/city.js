import React from 'react';
import utils from '../../utils/utils';
import { Card, Table, Button, Form, Select, Modal, message } from 'antd';
import Axios from '../../axios';

export default class MyCity extends React.Component {
    componentDidMount(){
        this.requestList();
    }

    state={
        dataSource: [],
        isShowOpenCity: false,
    }
    params={
        page: 1,
    }
    // 开通城市
    handleOpenCity=()=>{
        this.setState({
            isShowOpenCity: true,
        })
    }

    // 开通城市提交
    openCitySummit=()=>{
        
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        Axios.ajax({
            url: '/city/open',
            data:{
                params:cityInfo
            }
        }).then((res)=>{
            if(res.code == '0'){
                message.success("开通成功");
                this.setState({
                    isShowOpenCity:false
                })
                this.requestList();
            }
        })
    }

    // 请求接口数据
    requestList=()=>{
        let _this = this;
        Axios.ajax({
            url: '/open_city',
            data: {
                params:{
                    page: this.params.page,
                }
            }
        }).then((res)=>{
            if(res.code == 0) {
                // 给每行赋唯一值
                res.result.item_list.map((item,index)=>{
                    item.key = index;
                 })
                this.setState({
                    dataSource: res.result.item_list,
                    selectedRowKeys:[],
                    selectedRows:null,
                    pagination: utils.pagination(res,(current)=>{
                        _this.params.page = current;
                        this.requestList();
                    }),
                })
            }
        })
    }

    render() {
        const columns = [
            {
                title:'城市ID',
                dataIndex:'id'
            }, {
                title: '城市名称',
                dataIndex: 'name'
            }, {
                title: '用车模式',
                dataIndex: 'mode',
                render(mode){
                    return mode ==1 ?'停车点':'禁停区';
                }
            }, {
                title: '营运模式',
                dataIndex: 'op_mode',
                render(op_mode) {
                    return op_mode == 1 ? '自营' : '加盟';
                }
            }, {
                title: '授权加盟商',
                dataIndex: 'franchisee_name'
            }, {
                title: '城市管理员',
                dataIndex: 'city_admins',
                render(arr){
                    return arr.map((item)=>{
                        return item.user_name;
                    }).join(',');
                }
            }, {
                title: '城市开通时间',
                dataIndex: 'open_time'
            }, {
                title: '操作时间',
                dataIndex: 'update_time',
                render: utils.formateDate
            }, {
                title: '操作人',
                dataIndex: 'sys_user_name'
            }
        ]

        return(
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
                </Card>
                <Card>
                    <Table columns={columns}
                        bordered
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}/>
                </Card>
                <Modal title="开通城市"
                        visible={this.state.isShowOpenCity}
                        onCancel={()=>{
                            this.setState({
                                isShowOpenCity: false,
                            })
                        }}
                        onOk={()=>this.openCitySummit()}>
                    <OpenCityForm  wrappedComponentRef={(inst)=>{this.cityForm = inst;}}/>
                </Modal>
            </div>
        )
    }
}
class FilterForm extends React.Component{

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <Form.Item label="城市">
                    {
                        getFieldDecorator('city_id')(
                            <Select
                                style={{width:100}}
                                placeholder="全部"
                            >
                                <Select.Option value="">全部</Select.Option>
                                <Select.Option value="1">北京市</Select.Option>
                                <Select.Option value="2">天津市</Select.Option>
                                <Select.Option value="3">深圳市</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label="用车模式">
                    {
                        getFieldDecorator('mode')(
                            <Select
                                style={{ width: 120 }}
                                placeholder="全部"
                            >
                                <Select.Option value="">全部</Select.Option>
                                <Select.Option value="1">指定停车点模式</Select.Option>
                                <Select.Option value="2">禁停区模式</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label="营运模式">
                    {
                        getFieldDecorator('op_mode')(
                            <Select
                                style={{ width: 80 }}
                                placeholder="全部"
                            >
                                <Select.Option value="">全部</Select.Option>
                                <Select.Option value="1">自营</Select.Option>
                                <Select.Option value="2">加盟</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label="加盟商授权状态">
                    {
                        getFieldDecorator('auth_status')(
                            <Select
                                style={{ width: 100 }}
                                placeholder="全部"
                            >
                                <Select.Option value="">全部</Select.Option>
                                <Select.Option value="1">已授权</Select.Option>
                                <Select.Option value="2">未授权</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    <Button type="primary" style={{margin:'0 20px'}}>查询</Button>
                    <Button>重置</Button>
                </Form.Item>
            </Form>
        );
    }
}
FilterForm = Form.create({})(FilterForm);

class OpenCityForm extends React.Component{
    render(){
        const FormItemLayout = {
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:15
            }
        }
        const { getFieldDecorator }  =this.props.form;
        return (
            <Form layout="horizontal">
                <Form.Item label="选择城市" {...FormItemLayout}>
                    {
                        getFieldDecorator('city_id',{
                            initialValue:'1'
                        })(
                            <Select>
                                <Select.Option value="">全部</Select.Option>
                                <Select.Option value="1">北京市</Select.Option>
                                <Select.Option value="2">天津市</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label="营运模式" {...FormItemLayout}>
                    {
                        getFieldDecorator('op_mode', {
                            initialValue: '1'
                        })(
                            <Select>
                                <Select.Option value="1">自营</Select.Option>
                                <Select.Option value="2">加盟</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label="用车模式" {...FormItemLayout}>
                    {
                        getFieldDecorator('use_mode', {
                            initialValue: '1'
                        })(
                            <Select>
                                <Select.Option value="1">指定停车点</Select.Option>
                                <Select.Option value="2">禁停区</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
            </Form>
        );
    }
}
OpenCityForm = Form.create({})(OpenCityForm);