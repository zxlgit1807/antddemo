import React from 'react';
import { Card } from 'antd';
import './echartTheme';
// 导入柱形图
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
// 引入饼图和折线图
import 'echarts/lib/chart/bar'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEchars from 'echarts-for-react'
import echartTheme from './echartTheme';
/**
 * 图表
 */
export default class MyBars extends React.Component {

    componentWillMount(){
        // 注入主题
        echarts.registerTheme('MyTheme', echartTheme);
    }

    getOption=()=>{
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip : {
                trigger: 'axis'
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: '订单量',
                type: 'bar',
                data: [1000, 2000,1500, 3000, 800, 1111, 2231]
            }]
        }
        return option;
    }

    getOption2(){
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend:{
                data:['OFO','摩拜','小蓝']
            },
            xAxis: {
                data: [
                    '周一',
                    '周二',
                    '周三',
                    '周四',
                    '周五',
                    '周六',
                    '周日'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'OFO',
                    type: 'bar',
                    data: [
                        2000,
                        3000,
                        5500,
                        7000,
                        8000,
                        12000,
                        20000
                    ]
                },
                {
                    name: '摩拜',
                    type: 'bar',
                    data: [
                        1500,
                        3000,
                        4500,
                        6000,
                        8000,
                        10000,
                        15000
                    ]
                },
                {
                    name: '小蓝',
                    type: 'bar',
                    data: [
                        1000,
                        2000,
                        2500,
                        4000,
                        6000,
                        7000,
                        8000
                    ]
                },
            ]
        }
        return option;
    }

    render(){
        return(
            <div>
                <Card title="柱形图表1">
                    <ReactEchars
                        option={this.getOption()}
                        theme="MyTheme"
                    ></ReactEchars>
                </Card>
                <Card title="柱形图表之二" style={{marginTop:10}}>
                    <ReactEchars option={this.getOption2()} theme="Imooc" notMerge={true} lazyUpdate={true} style={{ height: 500 }} />
                </Card>
            </div>
        )
    }
}