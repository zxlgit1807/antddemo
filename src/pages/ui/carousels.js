import React from 'react';
import { Card, Carousel } from 'antd';
import './ui.css';

export default class MyCarousels extends React.Component{

    render() {
        return(
            <div>
                <Card title="文字轮播">
                    <Carousel autoplay="true">
                        <div><h1>你好啊</h1></div>
                        <div><h1>你好啊</h1></div>
                        <div><h1>你好啊</h1></div>
                    </Carousel>
                </Card>

                <Card title="图片轮播" className="myCarousel">
                    <Carousel autoplay="true" >
                        <div><img src="/gallery/1.png"   height={540} width="100%"></img></div>
                        <div><img src="/gallery/2.png"  height={540} width="100%"></img></div>
                        <div><img src="/gallery/3.png"  height={540} width="100%"></img></div>
                    </Carousel>
                </Card>
            </div>
        );
    }
}