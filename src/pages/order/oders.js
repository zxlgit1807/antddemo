import React from 'react';
import { Card, Button, Table, DatePicker, Form, Select, Modal } from 'antd';
import Axios from '../../axios';
import utils from '../../utils/utils';
import FilterForm from '../baseForm/filterForm';

export default class MyOrders extends React.Component{
    componentDidMount(){
        this.requestList();
    }
    state={
        dataSource: [],
    }
    params={
        page: 1,
    }
    formList = [
        {
            type:'SELECT',
            label:'城市',
            field:'city',
            placeholder:'全部',
            initialValue:'1',
            width:80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
        },
        {
            type: '时间查询'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field:'order_status',
            placeholder: '全部',
            initialValue: '1',
            width: 120,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
        }
    ]

    // 请求接口数据
    requestList=()=>{
        let _this = this;
        Axios.requestList(_this, '/order/list', this.params);
        // 已经优化
        // Axios.ajax({
        //     url: '/order/list',
        //     data: {
        //         params:{
        //             page: this.params,
        //         }
        //     }
        // }).then((res)=>{
        //     if(res.code == 0) {
        //         // 给每行赋唯一值
        //         res.result.item_list.map((item,index)=>{
        //             item.key = index;
        //             })
        //         this.setState({
        //             dataSource: res.result.item_list,
        //             selectedRowKeys:[],
        //             selectedRows:null,
        //             pagination: utils.pagination(res,(current)=>{
        //                 _this.params.page = current;
        //                 this.requestList();
        //             }),
        //         })
        //     }
        // })
    }

    // 订单详情
    openOrderDetail = ()=>{
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请先选择一条订单'
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`,'_blank')
    }

    // 行点击单选
    onRowClick=(record, index)=> {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        });

    }

    // 点击查询，由子组件触发
    handleFilter =(params)=>{
        this.params = params;
        this.requestList();
    }

    render() {
        const columns = [
            {
                title:'订单编号',
                dataIndex:'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]
       
        // 指定是否单选，及选择值
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: this.state.selectedRowKeys
        }
        
        return(
            <div>
                <Card>
                    {/* <FilterForm/> */}
                    {/* 进行优化，模块化 */}
                    <FilterForm formList={this.formList} filterSubmit={this.handleFilter}></FilterForm>
                </Card>
                <Card>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary">结束订单</Button>
                </Card>
                <Card>
                    <Table columns={columns}
                        bordered
                        rowSelection= {rowSelection}
                        onRow={(record, index) => {
                            return {
                              onClick: () => {
                                  this.onRowClick(record, index);
                              },       // 点击行
                            };
                          }}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}/>
                </Card>
            </div>
        )
    }
}

// 已经优化
// class FilterForm extends React.Component{

//     render(){
//         const { getFieldDecorator } = this.props.form;
//         return (
//             <Form layout="inline">
//                 <Form.Item label="城市">
//                     {
//                         getFieldDecorator('city_id')(
//                             <Select
//                                 style={{width:100}}
//                                 placeholder="全部"
//                             >
//                                 <Select.Option value="">全部</Select.Option>
//                                 <Select.Option value="1">北京市</Select.Option>
//                                 <Select.Option value="2">天津市</Select.Option>
//                                 <Select.Option value="3">深圳市</Select.Option>
//                             </Select>
//                         )
//                     }
//                 </Form.Item>
//                 <Form.Item label="订单时间">
//                     {
//                         getFieldDecorator('start_time')(
//                             <DatePicker />
//                         )
//                     }
//                 </Form.Item>
//                 <Form.Item>
//                     {
//                         getFieldDecorator('end_time')(
//                             <DatePicker />
//                         )
//                     }
//                 </Form.Item>
//                 <Form.Item label="订单状态">
//                     {
//                         getFieldDecorator('op_mode')(
//                             <Select
//                                 style={{ width: 80 }}
//                                 placeholder="全部"
//                             >
//                                 <Select.Option value="">全部</Select.Option>
//                                 <Select.Option value="1">进行中</Select.Option>
//                                 <Select.Option value="2">结束</Select.Option>
//                             </Select>
//                         )
//                     }
//                 </Form.Item>
               
//                 <Form.Item>
//                     <Button type="primary" style={{margin:'0 20px'}}>查询</Button>
//                     <Button>重置</Button>
//                 </Form.Item>
//             </Form>
//         );
//     }
// }
// FilterForm = Form.create({})(FilterForm);