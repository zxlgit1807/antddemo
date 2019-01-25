import { Select } from "antd";
import React from 'react';

export default {
    formateDate(data){
        if(!data) {
            return '';
        }
        let time = new Date(data);
        return time.getFullYear()+"-"+time.getMonth()+1 +"-"+time.getDay()+" "+time.getHours() + ":"+time.getMinutes()+":"+time.getSeconds();
    },
    // 分页
    pagination(data, callback){
        return {
            onChange:(current)=>{
                callback(current)
            },
            current:data.result.page,
            pageSize:data.result.page_size,
            total: data.result.total,
            showTotal:()=>{
                return `共${data.result.total}条`
            },
            showQuickJumper:true
        }
    },
    // 生成option列表
    getOptionList(data){
        if(!data){
            return [];
        }
        let options = [] //[<Option value="0" key="all_key">全部</Option>];
        data.map((item)=>{
            options.push(<Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>)
        })
        return options;
    }, 

        /**
     * ETable 行点击通用函数
     * @param {*选中行的索引} selectedRowKeys
     * @param {*选中行对象} selectedItem
     */
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
        if (selectedIds) {
            this.setState({
                selectedRowKeys,
                selectedIds: selectedIds,
                selectedItem: selectedRows
            })
        } else {
            this.setState({
                selectedRowKeys,
                selectedItem: selectedRows
            })
        }
    },
}