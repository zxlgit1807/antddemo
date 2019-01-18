import React from 'react';
import './components/style/common.css';
import { Button, Row, Col } from 'antd';
import Footer from './components/footer';
import MenuLeft from './components/menuLeft';
import MyHeader from './components/header';

export default class Admin extends React.Component {

    render() {
        return(
            <Row className="container">
                <Col span="3" className="nav-left">
                    <MenuLeft></MenuLeft>
                </Col>
                <Col span="21" className="main">
                    <MyHeader></MyHeader>
                    <Row className="content">
                        中间
                    </Row>
                    <Footer></Footer>
                </Col>
            </Row>
        )
    }
}