import { Component, ViewChild } from '@angular/core';
import { Platform, Events, ToastController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {NativeStorage} from '@ionic-native/native-storage';
import {ApiProvider} from '../providers/api/api';

import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild (Nav) nav: Nav;
  
  rootPage:any = WelcomePage;
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private events: Events, private apiProvider: ApiProvider, private nativeStorage: NativeStorage, private toastCtrl: ToastController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      //splashScreen.show();
      splashScreen.hide();
//      setTimeout(function() {
//        splashScreen.hide();
//		console.log("splash screen hide");
//      }, 3000);
      
      this.events.subscribe('auth:logout', (token) => {
        this.logout(token);
      });
    });
  }
  
  logout(token: any) {
    this.apiProvider.post('auth/logout', {}, {"Content-Type": "application/json", "Authorization": "Bearer " + token})
    .then ((data) => {
      
      this.nativeStorage.setItem('isLoggedIn', false);
      this.nativeStorage.setItem('token', null);
      this.nativeStorage.setItem('user', null);
      
      let result = JSON.parse(data.data);
       this.toastCtrl.create({
         message: result.message,
         duration: 3000,
         position: 'buttom',
         dismissOnPageChange: false,
       }).present();
       
       this.nav.setRoot(LoginPage, {}, {
         animate: true
       });
    })
    .catch((error) => {
      
      this.nativeStorage.setItem('isLoggedIn', false);
      this.nativeStorage.setItem('token', null);
      this.nativeStorage.setItem('user', null);
      
      this.toastCtrl.create({
         message: "Logout success",
         duration: 3000,
         position: 'buttom',
         dismissOnPageChange: false,
       }).present();
       
       this.nav.setRoot(LoginPage, {}, {
         animate: true
       });
    });
  }
}

