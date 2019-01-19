import { timingSafeEqual } from "crypto";

export default {
    formateDate(data){
        if(!data) {
            return '';
        }
        let time = new Date(data);
        return time.getFullYear()+"-"+time.getMonth()+1 +"-"+time.getDay()+" "+time.getHours() + ":"+time.getMinutes()+":"+time.getSeconds();
    }
}