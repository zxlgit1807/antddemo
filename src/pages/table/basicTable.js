import React from 'react';
import { Card, Table } from 'antd';
import axios from '../../axios/index';

export default class MyBasicTable extends React.Component{

    state={
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
        //data.map((item,index)=>{
        //    item.key = index;
        //})
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
        axios.ajax({
            url: '/user/list',
            data: {
                params:{
                    page: 1,
                }
            }
        }).then((res)=>{
            if(res.code == 0) {
                this.setState({
                    dataSource2: res.result
                })
            }
        })
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
            dataIndex: 'sex'
        }, {
            title: '状态',
            dataIndex: 'state'
        }, {
            title: '爱好',
            dataIndex: 'interest'
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
            </div>
        )
    }
}
