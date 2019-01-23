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
    }
}