import React from 'react';
import { Form, Input, Select, Checkbox, Button, DatePicker } from 'antd';
import utils from '../../utils/utils';
/**
 * 模块化封装 form
 */
class MyFilterForm extends React.Component{

    // 查询方法
    handleFilterSubmit=()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        // 父组件方法
        this.props.filterSubmit(fieldsValue);
    }
    // 重置
    reset = ()=>{
        this.props.form.resetFields();
    }

    // 初始化form
    initFormList=()=>{
        const {getFieldDecorator} = this.props.form;
        const formList = this.props.formList;
        const formItemList = [];
        if(formList && formList.length > 0) {
            formList.forEach((item, i) => {
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder;
                let width = item.width;
                if(item.type == "INPUT") {
                    const INPUT = <Form.Item label={label} key={field}>
                        {
                            getFieldDecorator([field],{
                                initialValue: initialValue
                            })(
                                <Input type="text" placeholder={placeholder} />
                            )
                        }
                    </Form.Item>;
                    formItemList.push(INPUT)
                }else if(item.type == "SELECT") {
                    const SELECT = <Form.Item label={label} key={field}>
                    {
                        getFieldDecorator([field],{
                            initialValue: initialValue,
                        })(
                            <Select
                                style={{ width: width }}
                                placeholder={placeholder}
                            >
                                {utils.getOptionList(item.list)}
                            </Select>
                        )
                    }
                    </Form.Item>;
                    formItemList.push(SELECT)
                }else if (item.type == 'CHECKBOX') {
                    const CHECKBOX = <Form.Item label={label} key={field}>
                        {
                            getFieldDecorator([field], {
                                valuePropName: 'checked',
                                initialValue: initialValue //true | false
                            })(
                                <Checkbox>
                                    {label}
                                </Checkbox>
                            )
                        }
                    </Form.Item>;
                    formItemList.push(CHECKBOX)
                }else if (item.type == '时间查询') {
                    const begin_time = <Form.Item label="订单时间" key={field}>
                        {
                            getFieldDecorator('begin_time')(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
                            )
                        }
                    </Form.Item>;
                    formItemList.push(begin_time)
                    const end_time = <Form.Item label="~" colon={false} key={field}>
                        {
                            getFieldDecorator('end_time')(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                            )
                        }
                    </Form.Item>;
                    formItemList.push(end_time)
                }
                
            });
        }
        return formItemList;
    }

    render(){
        return(
            <Form layout="inline">
                {this.initFormList()}
                <Form.Item>
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create({})(MyFilterForm);