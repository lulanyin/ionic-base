import { Injectable } from '@angular/core';
import { Server } from "../../config/server";
import { Storage } from "@ionic/storage";

@Injectable()
export class WebSocketProvider {

  /**
   * websocket 对象
   */
  public ws : WebSocket;

  /**
   * 是否保持连接
   */
  public connect : boolean = false;

  /**
   * 初始化
   */
  constructor(private storage : Storage) {
    this.reConnect();
  }

  /**
   * 连接
   */
  private reConnect(){
    this.storage.get("token").then(token => {
      if(this.connect){
        this.ws.close();
      }
      this.ws = new WebSocket(Server.socket + "?token=" + token);
      let self = this;
      this.ws.onopen = function (event) {
        self.onOpen(event);
      };
      this.ws.onerror = function (event) {
        self.onError(event);
      };
      this.ws.onmessage = function (event) {
        self.onMessage(event);
      };
      this.ws.onclose = function (event) {
        self.onClose(event);
      };
    });
  }

  /**
   * 客户端连接成功
   * @param event
   */
  public onOpen(event){
    this.connect = true;
    if(Server.debug){
      console.log('[OK]', event);
    }
    //10秒钟1个心跳
    this.startHeartbeat();
  }

  /**
   * 客户端连接错误
   * @param event
   */
  public onError(event){
    if(Server.debug){
      console.log('[error]', event);
    }
  }

  /**
   * 收到服务端消息
   * @param event
   */
  public onMessage(event){
    if(Server.debug){
      console.log('[message]', event);
    }
    try{
      let data = JSON.parse(event.data);
      let on = data.event || null;
      if(on){
        if(typeof this.eventList[on] == 'function'){
          this.eventList[on](this, data);
        }
        if(typeof this.tempEventList[on] == 'function'){
          this.tempEventList[on](this, data);
        }
      }
    }catch (e) {

    }
  }

  /**
   * 客户端连接断开
   * @param event
   */
  public onClose(event){
    //不要随意主动重连，如果服务端主动拒绝，会造成死循环
    this.connect = false;
    if(Server.debug){
      console.log('[close]', event);
    }
  }

  /**
   * 发送数据
   * @param event
   * @param data
   * @return boolean
   */
  public send(event : string, data : any = null){
    data = data || {};
    data = {
      event : event,
      data : data
    };
    if(this.connect){
      this.ws.send(JSON.stringify(data));
      return true;
    }else{
      console.log('not connection');
      return false;
    }
  }

  /**
   * 事件监听列表
   */
  private eventList : any = {};
  private tempEventList : any = {};

  /**
   * 添加事件监听
   * @param event
   * @param callback
   * @param temp
   */
  public addEvent(event : string, callback : any, temp : boolean = false){
    if(temp){
      this.tempEventList[event] = callback;
    }else{
      this.eventList[event] = callback;
    }
  }

  /**
   * 开始自动心跳
   */
  public startHeartbeat(){
    if(this.connect){
      this.send('heartbeat', { time : new Date().toLocaleTimeString() });
      let self = this;
      setTimeout(function () {
        self.startHeartbeat();
      }, 10000)
    }
  }

  public close(){
    if(this.connect){
      this.ws.close();
    }
  }

}
