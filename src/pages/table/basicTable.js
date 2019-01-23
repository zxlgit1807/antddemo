import React from 'react';
import { Card, Table, Modal, Button, message } from 'antd';
import axios from '../../axios/index';
import utils from '../../utils/utils';

export default class MyBasicTable extends React.Component{

    state={
    }
    params = {
        page: 1
    }

    componentDidMount(){
        const data = [
            {
                id:'012',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-01-01',
                address:'北京市海淀区奥林匹克公园',
                time:'09:00'
            },
            {
                id: '112',
                userName: 'Tom',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                id: '212',
                userName: 'Lily',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
        ]
        data.map((item,index)=>{
           item.key = index;
        })
        this.setState({
            dataSource: data
        })
        this.request();
    }

    // 动态获取mock数据
    // request=()=>{
    //     axios.get('https://www.easy-mock.com/mock/5c4734d02da20279e9a765a3/zxl/user/list')
    //         .then((res)=>{
    //             // console.log("用户列表：" + JSON.stringify(res));
    //             if(res.status == '200' && res.data.code == 0) {
    //                 this.setState({
    //                     dataSource2: res.data.result
    //                 })
    //             }
    //         });
    // }
    request=()=>{
        let _this = this;
        axios.ajax({
            url: '/user/list',
            data: {
                params:{
                    page: this.params.page,
                }
            }
        }).then((res)=>{
            if(res.code == 0) {
                // 给每行赋唯一值
                res.result.list.map((item,index)=>{
                    item.key = index;
                 })
                this.setState({
                    dataSource2: res.result.list,
                    selectedRowKeys:[],
                    selectedRows:null,
                    pagination: utils.pagination(res,(current)=>{
                        _this.params.page = current;
                        this.request();
                    }),
                })
            }
        })
    }

    // 行点击单选
    onRowClick=(record, index)=> {
        let selectKey = [index];
        Modal.info({
            title: "单选信息",
            content: `用户名：${record.userName}`,
        })
        this.setState({
            selectedRowKeys: selectKey,
            selectItem: record
        });

    }

    // 删除
    handleDelete=()=>{
        let rows = this.state.selectedRows;
        // 获取每行的id
        let ids = [];
        if(rows){
            rows.map((item)=>{
                ids.push(item.id);
            })
            Modal.confirm({
                title: '删除',
                content: '确定要让这些人滚蛋么',
                onOk: ()=>{
                    message.success(`${ids.join(',')}`+"删除成功");
                    // 刷新页面
                    this.request();
                }
            })
        }

    }

    render(){
        const columns = [{
            title: 'id',
            dataIndex: 'id'
        },{
            title: '用户名',
            dataIndex: 'userName'
        }, {
            title: '性别',
            dataIndex: 'sex',
            render(sex){
                return sex == 1 ? '男': '女'
            }
        }, {
            title: '状态',
            dataIndex: 'state',
            render(state){
                let config = {
                    '1': '世界首富',
                    '2': '知名作家',
                    '3': '国家主席',
                    '4': '全球偶像',
                    '5': '屌丝一个',
                }
                return config[state];
            }
        }, {
            title: '爱好',
            dataIndex: 'interest',
            render(interest){
                let config = {
                    '1': '烧钱',
                    '2': '美女',
                    '3': '吃屎',
                    '4': '冥想',
                }
                return config[interest];
            }
        }, {
            title: '生日',
            dataIndex: 'birthday'
        }, {
            title: '地址',
            dataIndex: 'address'
        }, {
            title: '早起时间',
            dataIndex: 'time'
        }]

        // 指定是否单选，及选择值
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: this.state.selectedRowKeys
        }
        // 指定是否多选，及选择值
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys:this.state.selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }

        return(
            <div>
                <Card title="基础表格">
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                    />
                </Card>
                <Card title="动态表格">
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                    />
                </Card>

                <Card title="Mock-单选" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        rowSelection= {rowSelection}
                        columns={columns}
                        onRow={(record, index) => {
                            return {
                              onClick: () => {
                                  this.onRowClick(record, index);
                              },       // 点击行
                            };
                          }}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>

                <Card title="Mock-多选" style={{ margin: '10px 0' }}>
                    <div style={{ margin: '0 0 10px' }}>
                          <Button type="primary" onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        bordered
                        rowSelection={rowCheckSelection}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>

                <Card title="Mock-表格分页" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        )
    }
}
