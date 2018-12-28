import {Component, Input} from '@angular/core';

@Component({
  selector: 'count-down',
  templateUrl: 'count-down.html'
})
export class CountDownComponent {

  text: string;

  public _seconds : number = 0;
  @Input() set seconds(num : any){
    this._seconds = parseInt(num);
    this.down();
  }

  constructor() {

  }

  time : any = null;
  down(){
    if(isNaN(this._seconds)){
      this.text = "00:00:00";
      return;
    }
    if(this._seconds<=0){
      this.text = '已过期';
      return;
    }
    if(this.time){
      clearTimeout(this.time);
    }
    let time = this._seconds;
    let hours = Math.floor(time/3600);
    let minutes = Math.floor((time%3600)/60);
    let minutesString = minutes<10 ? ("0" + minutes) : minutes.toString();
    let seconds = (time%3600)%60;
    this._seconds--;
    this.text = hours + ":" + minutesString + ":" + ((seconds<10 ? "0" : '') + seconds);
    if(time-1==0){
      clearTimeout(this.time);
    }else{
      let self = this;
      this.time = setTimeout(() => {
        self.down();
      }, 1000);
    }
  }

}
