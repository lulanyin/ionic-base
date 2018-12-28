import { Injectable } from '@angular/core';

@Injectable()
export class Server{
  //是否开启Debug
  static debug : boolean = false;
  //服务端HTTP API接口地址
  static api : string = "";
  //服务端WebSocket接口地址
  static socket : string = "";
}
