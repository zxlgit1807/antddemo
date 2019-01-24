import React from 'react';
import './components/style/common.css';
import { Button, Row, Col } from 'antd';
import Footer from './components/footer';
import MenuLeft from './components/menuLeft';
import MyHeader from './components/header';

/**
 * 主页面载体
 */
export default class Admin extends React.Component {

    render() {
        return(
            <Row className="container">
                <Col span="3" className="nav-left">
                    <MenuLeft></MenuLeft>
                </Col>
                <Col span="21" className="main">
                    <MyHeader className= 'main-header'></MyHeader>
                    <Row className="content">
                        {this.props.children}
                    </Row>
                    <Footer></Footer>
                </Col>
            </Row>
        )
    }
}