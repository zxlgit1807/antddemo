import React from 'react';
import { Row, Col } from 'antd';
import './header.css';
import Util from './../../utils/utils';
import Axios from './../../axios/index';

export default class MyHeader extends React.Component {

    state = {}

    componentWillMount() {
        this.setState({
            userName: "磊爷"
        })
        // 每隔一秒，获取时间
        setInterval(()=> {
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        },1000)
        this.getWeatherData();
    }
    /**
     * 获取天气
     */
    getWeatherData() {
        let city = "北京";
        Axios.jsonp({
            url: 'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res)=> {
            if(res.status == 'success') {
                let data = res.results[0].weather_data[0];
                console.log(data.weather);
                this.setState({
                    dayPictureUrl: data.nightPictureUrl,
                    weather: data.weather,
                })
            }
        })
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
                        <span className="date">{this.state.sysTime}</span>
                        <span className="weather-img">
                            <img src={this.state.dayPictureUrl} alt=""></img>
                        </span>
                        <span className="weather-detail">
                            {this.state.weather}
                        </span>
                    </Col>
                </Row>
            </div>
        )
    }
}