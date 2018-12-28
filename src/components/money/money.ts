import { Component, Input } from '@angular/core';

@Component({
  selector: 'money',
  templateUrl: 'money.html'
})
export class MoneyComponent {

  public text : string = '0.00';

  public _money : any = 0;

  public _numlen : number = 15;
  @Input() set numlen(num : any){
    this._numlen = parseInt(num);
  }

  times : number = 0;
  @Input() set money(money : any){
    if(!this.checkNumber(money)){
      this.text = money;
    }else{
      money = parseFloat(money);
      this._money = money;
      this.text = this.cutDecimal(money.toFixed(this._decimal));
    }
  }

  public _decimal : number = 2;
  @Input() set decimal(decimal : any){
    this._decimal = this.checkNumber(decimal) ? parseInt(decimal) : 2;
    if(this.checkNumber(this._money)){
      this.text = this.cutDecimal(this._money.toFixed(this._decimal));
    }
  }

  constructor() {

  }

  private checkNumber(number){
    let regPos = /^\d+(\.\d+)?$/; //非负浮点数
    let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if(regPos.test(number) || regNeg.test(number)){
      return true;
    }else{
      return false;
    }
  }

  private cutDecimal(value) : string{
    let len = this._numlen;
    if(value.indexOf(".")>0 && value.length>len){
      let arr = value.split(".");
      let int = arr[0];
      let dec = arr[1];
      if(int.length>len){
        return int;
      }else{
        let lastLen = len-int.length;
        if(parseInt(dec)>0){
          return int + "." + (dec.length>lastLen ? dec.slice(0, lastLen) : dec);
        }else{
          return parseInt(int).toFixed(lastLen);
        }
      }
    }else{
      return value.length > len ? value.slice(0, len) : value
    }
  }

}
