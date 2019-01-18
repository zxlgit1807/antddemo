import React from 'react';
import MenuConfig from './../../config/menuConfig';
import { Menu, Icon, Switch } from 'antd';
import './left.css';
const { SubMenu } = Menu;

export default class MenuLeft extends React.Component {
    /**
     * 将要装载，在render之前调用
     * 每一个组件render之前立即调用
     */
    componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({
            menuTreeNode
        })
    }

    // 菜单渲染
    renderMenu = (data)=> {
        return data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu title={item.title} key={item.key}>
                        { this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                {item.title}
            </Menu.Item>
        })
    }

    render() {
        return(
            <div>
                <div className="icon_css">
                    <img className="logo_img" src="/assets/bike.jpg"/>
                    <font className="logo_font">我的第一个系统</font>
                </div>
                <Menu theme="dark" mode="vertical">
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}