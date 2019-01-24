import React from 'react';
import './components/style/common.css';
import { Row } from 'antd';
import MyHeader from './components/header';
/**
 * 通用页面载体
 */
export default class Commons extends React.Component {

    render() {
        return(
            <div>
                <Row className="simple-page">
                    <MyHeader menuType="second"/>
                </Row>
                <Row className="content">
                    {this.props.children}
                </Row>   
            </div>        
        )
    }
}