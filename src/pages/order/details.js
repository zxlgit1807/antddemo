import React from 'react';
import { Card, Button, Table, DatePicker, Form, Select, Modal } from 'antd';
import Axios from '../../axios';
import utils from '../../utils/utils';
import './detail.css';

export default class MyOrders extends React.Component{

    state={

    }
    componentDidMount(){
        let orderId = this.props.match.params.orderId;
        if(orderId) {
            this.getDetailOderInfo(orderId);
        }
    }

    getDetailOderInfo=(orderId)=>{
        let _this = this;
        Axios.ajax({
            url: '/order/detail',
            data: {
                params:{
                    orderId: orderId,
                }
            }
        }).then((res)=>{
            console.log(res);
            if(res.code == 0) {
               this.setState({
                    oderInfo: res.result
               })
            }
        })
    }

    render(){
        const info = this.state.oderInfo || {};
        return(
            <div>
                <Card>
                <div id="orderDetailMap" className="order-map"></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式：{info.mode == 1 ?'服务区':'停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号：{info.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号：{info.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名:{info.user_name}</div>
                                <div className="detail-form-content"></div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码:{info.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行程起点:{info.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点:{info.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程:{info.distance/1000}公里</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}