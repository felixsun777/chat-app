import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ChatPage } from '../pages/chat/chat';
import { LoginPage } from '../pages/login/login';
import { FriendsPage } from '../pages/friends/friends';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload' ;

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    FriendsPage,
    ChatPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    CommonModule,
    FileUploadModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    FriendsPage,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}




