import {Component, Input} from '@angular/core';

@Component({
  selector: 'star',
  templateUrl: 'star.html'
})
export class StarComponent {

  starts = [];

  public _star : number = 5;
  @Input() set star(num : any){
    this._star = !isNaN(num) ? parseFloat(num) : 5;
    this.update();
  }

  constructor() {

  }

  update(){
    //处理数值，可以有半数
    let number : number = Math.floor(this._star / 0.5) * 0.5;
    //整数
    let int : number = Math.floor(number);
    int = Math.min(5, int);
    int = Math.max(0, int);
    let empty = [];
    let len = 0;
    for(let i = 0; i < int; i ++){
      empty.push({
        name : 'star'
      });
      len ++;
    }
    //如果有余
    if(number>int){
      len ++;
      empty.push({
        name : 'star-half'
      });
    }
    if(len<5){
      let last : number = 5-len;
      for(let j = 0; j < last; j ++){
        empty.push({
          name : 'star-outline'
        });
      }
    }

    this.starts = empty;
  }

}
