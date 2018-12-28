import { Injectable } from '@angular/core';
@Injectable()
export class util{
  
    static readonly server_busy : string = "服务端繁忙";
    static readonly invalidate_param : string = "无效的参数";
    static readonly http_fail : string = "请求数据失败";

    static readonly invalidate_qr_code : string = "无效的二维码";
    static readonly invalidate_controller : string = "无法使用该控件";

    //钱包名称
    static readonly wallet : any = {
      money : '通证',
      integral : '资产',
      eth : '以太坊',
      star : '信誉'
    };

    /**
     * 检测是不是手机号码格式
     * @param phone
     */
    static isPhoneNumber(phone) : boolean{
        return /^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(phone);
    }

    static isNumber(number){
      let regPos = /^\d+(\.\d+)?$/; //非负浮点数
      let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
      if(regPos.test(number) || regNeg.test(number)){
        return true;
      }else{
        return false;
      }
    }

    static lastId = 1;
    static incrId(){
      return this.lastId++;
    }
}
