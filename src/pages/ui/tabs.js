import React from 'react';
import { Card, Tabs, message, Icon } from 'antd';

const TabPane = Tabs.TabPane;
export default class MyTabs extends React.Component{
   
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        
        const panes = [
            { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
            { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
            {
              title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false,
            },
        ];
        this.state = {
            activeKey: panes[0].key,
            panes,
        };
    }

    callback=(key)=>{
        message.info("你选择了"+ key);
    }

    onChange = (activeKey) => {
        this.setState({ activeKey });
      }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    
    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    }
    
    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
            lastIndex = i - 1;
        }
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
          activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
         });
    }

    render() {
        return(
            <div>
                <Card title="Tab页签">
                    <Tabs defaultActiveKey="2" onChange={this.callback}>
                        <TabPane key="1" tab="标签1">TabPane 1</TabPane>
                        <TabPane key="2" tab="标签2" disabled>TabPane 2</TabPane>
                        <TabPane key="3" tab="标签3">TabPane 3</TabPane>
                    </Tabs>
                </Card>

                <Card title="Tab图片页签">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane key="1" tab={<span><Icon type="loading"/>标签1</span>}>TabPane 1</TabPane>
                        <TabPane key="2" tab={<span><Icon type="delete"/>标签2</span>}>TabPane 2</TabPane>
                        <TabPane key="3" tab={<span><Icon type="edit"/>标签3</span>}>TabPane 3</TabPane>
                    </Tabs>
                </Card>
                
                <Card title="Ta动态页签">
                    <Tabs onChange={this.onChange} activeKey={this.state.activeKey} type="editable-card" onEdit={this.onEdit}>
                        {this.state.panes.map(pane => 
                            <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>)}
                    </Tabs>
                </Card>
            </div>
        );
    }
}