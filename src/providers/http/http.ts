import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import {AlertController, LoadingController} from "ionic-angular";
import { Server } from "../../config/server";
import { util } from "../../util/util";

@Injectable()
export class HttpProvider {

  constructor(
    public http: HttpClient,
    public loadingCtrl : LoadingController,
    public alertCtrl : AlertController
  ) {

  }

  public alert(message : string){
    this.alertCtrl.create({
      title : '提醒',
      message : message,
      buttons : ['知道了']
    }).present();
  }

  public serverBusy(){
    this.loadingFinish();
    this.alert(util.server_busy);
  }

  /**
   * loading 对象
   */
  public loadingObject : any = null;

  /**
   * 可选择性的Loading
   * @param message
   */
  public loading(message : string = null) {
    if(this.loadingObject){
      return this;
    }
    let loading = this.loadingCtrl.create({
      content : message
    });
    loading.present();
    this.loadingObject = loading;
    return this;
  };

  /**
   * Loading 结束
   */
  public loadingFinish() {
    let self = this;
    if(self.loadingObject){
      self.loadingObject.dismiss().then(()=>{
        self.loadingObject = null;
      });
    }
    return this;
  };

  /**
   * HTTP POST
   * @param url
   * @param params
   * @param subscribe
   */
  public post = (url : string, params : any, subscribe : boolean = true) : Observable<any> => {
    params = params || { };
    let headers = new HttpHeaders()
      .append("X-Requested-With", "XMLHttpRequest");
    let httpParams;
    if(!(params instanceof HttpParams)){
      httpParams = new HttpParams({
        fromObject : params
      });
    }else{
      httpParams = params;
    }
    if(!url.startsWith('http')){
      url = Server.api + (url.startsWith("/") ? '' : '/') + url;
    }
    return this.http.post(url, httpParams, {
      headers : headers
    });
  };

  /**
   * HTTP GET
   * @param url
   * @param params
   * @param subscribe
   */
  public get = (url : string, params : any = null, subscribe : boolean = true) : Observable<any> => {
    params = params || { };
    let headers = new HttpHeaders()
      .append("X-Requested-With", "XMLHttpRequest");
    let query = [];
    for(let field in params){
      query.push(field + '=' + encodeURI(params[field]));
    }
    url += url.indexOf("?")>0 ? '' : '?';
    url += query.join("&");
    if(!url.startsWith('http')){
      url = Server.api + (url.startsWith("/") ? '' : '/') + url;
    }
    return this.http.get( url, {
      headers : headers
    });
  };

}
