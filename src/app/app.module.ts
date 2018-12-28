import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ComponentsModule } from "../components/components.module";
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";
import { AppAvailability } from "@ionic-native/app-availability";
import { Camera } from "@ionic-native/camera";
import { Clipboard } from "@ionic-native/clipboard";
import { Crop } from "@ionic-native/crop";
import { FileTransferObject } from "@ionic-native/file-transfer";
import { HttpProvider } from "../providers/http/http";
import { WebSocketProvider } from "../providers/web-socket/web-socket";
import { File } from '@ionic-native/file';
import {Badge} from "@ionic-native/badge";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {QRScanner} from "@ionic-native/qr-scanner";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      //backButtonIcon : "md-arrow-back",
      //IOS主题的图标, ios/md
      iconMode: "ios",
      //页面转换时的动画使用IOS的动画
      pageTransition: "ios-transition",
      //返回文字为空，不显示
      backButtonText: ""
    }),
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: "ionicAppDb",
      driverOrder: ['indexeddb', 'sqlite', 'localstorage', 'websql']
    }),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    //可用于检测相应的APP是否存在
    AppAvailability,
    //角标
    Badge,
    //拍照
    Camera,
    //粘贴板
    Clipboard,
    //图片裁剪
    Crop,
    //文件上传
    File,
    FileTransferObject,
    //Http
    HttpProvider,
    //内置浏览器
    InAppBrowser,
    //扫码
    QRScanner,
    //WebSocket
    WebSocketProvider
  ]
})
export class AppModule {}
