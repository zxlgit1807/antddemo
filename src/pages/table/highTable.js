import React from 'react';
import { Card, Table, Modal, Button, message } from 'antd';
import axios from '../../axios/index';
import utils from '../../utils/utils';

export default class MyHighTable extends React.Component{
    state={
        dataSource2:[]
    }
    params = {
        page: 1
    }
    componentDidMount(){

        this.request();
    }

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

    render() {
        const columns = [{
            title: 'id',
            width:50,
            fixed: 'left',
            dataIndex: 'id'
        },{
            title: '用户名',
            width:80,
            dataIndex: 'userName'
        }, {
            title: '性别',
            width:80,
            dataIndex: 'sex',
            render(sex){
                return sex == 1 ? '男': '女'
            }
        }, {
            title: '状态',
            width:80,
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
            width:80,
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
            width:80,
            dataIndex: 'birthday'
        }, {
            title: '地址',
            width:90,
            dataIndex: 'address'
        }, {
            title: '早起时间',
            width:80,
            dataIndex: 'time'
        }]

        return(
            <div>
                <Card title="头部及左侧固定">
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        scroll={{x:1300,y:200}}
                    />
                </Card>

            </div>
        ) 
    }
}