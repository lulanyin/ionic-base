import {Component, Input} from '@angular/core';

@Component({
  selector: 'str-format',
  templateUrl: 'str-format.html'
})
export class StrFormatComponent {

  public _string : string;
  @Input() set str(str : string){
    this._string = str;
    this.setText();
  }

  public _length : number = 0;
  // @ts-ignore
  @Input() set len(len : number = 0){
    this._length = len;
    this.setText();
  }

  text : string;

  constructor() {

  }

  setText(){
    if(this._length>0 && this._string.length>this._length){
      this.text = this._string.slice(0, this._length) + '...';
    }else{
      this.text = this._string;
    }
  }

}
