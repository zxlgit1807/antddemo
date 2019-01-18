import React from 'react';
import { Row, Col } from 'antd';
import './header.css';
import Util from './../../utils/utils';

export default class MyHeader extends React.Component {

    state = {}

    componentWillMount() {
        this.setState({
            userName: "磊爷"
        })
        // 每隔一秒
        setInterval(()=> {
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        },1000)
    }
    render() {
        return(
            <div className="header">
                <Row className="header-top">
                    <Col span="24">
                        <span>欢迎{this.state.userName}</span>
                        <a>退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span="4" className="breadcrumb-title">首页</Col>
                    <Col span="20" className="header-foot">
                        <span className="weather-detail">天气</span>
                        <span className="date">{this.state.sysTime}</span>
                    </Col>
                </Row>
            </div>
        )
    }
}