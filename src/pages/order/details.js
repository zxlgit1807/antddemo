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
               this.renderMap(res.result);
            }
        })
    }
    // 百度地图
    renderMap=(result)=>{
        this.map = new window.BMap.Map("orderDetailMap"); 
        //this.map.centerAndZoom('北京', 11);  
        this.addMapControl();
        this.drawBikeRoute(result.position_list);
        // 调用服务区绘制方法
        this.drwaServiceArea(result.area);
    }

    // 添加地图空间
    addMapControl =()=>{
        let map = this.map;
        map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
        map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT })); 
    }

    // 绘制路线
    drawBikeRoute = (positionList)=>{
        let map = this.map;
        let startPoint = '';
        let endPoint = '';
        if (positionList.length>0){
            let arr = positionList[0];
            let last = positionList[positionList.length-1];
            startPoint = new window.BMap.Point(arr.lon, arr.lat);
            let startIcon = new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,42),{
                imageSize:new window.BMap.Size(36,42),
                anchor: new window.BMap.Size(18, 42)
            })
            let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon});
            this.map.addOverlay(startMarker);

            endPoint = new window.BMap.Point(last.lon, last.lat);
            let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(18, 42)
            })
            let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon });
            this.map.addOverlay(endMarker);

            // 连接路线图
            let trackPoint = [];
            for(let i=0;i<positionList.length;i++){
                let point = positionList[i];
                trackPoint.push(new window.BMap.Point(point.lon, point.lat));
            }

            let polyline = new window.BMap.Polyline(trackPoint,{
                strokeColor:'#1869AD',
                strokeWeight:3,
                strokeOpacity:1
            })
            this.map.addOverlay(polyline);
            this.map.centerAndZoom(endPoint, 11);
        }
    }

    // 绘制服务区
    drwaServiceArea = (positionList)=>{
        // 连接路线图
        let trackPoint = [];
        for (let i = 0; i < positionList.length; i++) {
            let point = positionList[i];
            trackPoint.push(new window.BMap.Point(point.lon, point.lat));
        }
        // 绘制服务区
        let polygon = new window.BMap.Polygon(trackPoint, {
            strokeColor: '#CE0000',
            strokeWeight: 4,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity:0.4
        })
        this.map.addOverlay(polygon);
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