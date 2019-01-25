import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';
import utils from '../utils/utils';

export default class Axios {

    // 请求封装
    static requestList(_this, url, params){
        var data = {
            params: params
        }
        this.ajax({
            url,
            data
        }).then((data)=> {
            if(data && data.result) {
                let list = data.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                });
                _this.setState({
                    list,
                    pagination: utils.pagination(data,(current)=>{
                        _this.params.page = current;
                        _this.requestList();
                    }),
                })
            }
        })
    }


    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                if (response.status == 'success') {
                    resolve(response);
                } else {
                    reject(response.messsage);
                }
            })
        })
    };

    /**
     * ajax 接口请求
     * Promise 主要方便then 接收返回值
     */
    static ajax(options) {
        let loading;

        if(options.data && options.isShowLoading != false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseUrl = 'https://www.easy-mock.com/mock/5c4734d02da20279e9a765a3/zxl/';
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseUrl,
                timeout: 5000,
                params: ( options.data && options.data.params) || ''
            }).then((response)=> {
                if(options.data && options.isShowLoading != false){
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if (response.status == '200') {
                    // 这个0是自定义的返回值
                    if(response.data.code == 0){
                        resolve(response.data);
                    }else{
                        Modal.info({
                            title: '提示',
                            content: response.data.msg,
                        })
                    }
                } else {
                    reject(response.data);
                }
            })
            
        })
    }
}