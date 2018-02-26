import { Component } from '@angular/core';
import { NavController, ViewController, ToastController, Events } from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';

import {LoginPage} from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  token: string;

  constructor(public navCtrl: NavController, private viewCtrl: ViewController, private nativeStorage: NativeStorage,  private events: Events, private toastCtrl: ToastController) {
    
    this.nativeStorage.getItem("isLoggedIn").then(data => {
      
      if (!data) {
        
        this.toastCtrl.create({
            message: "Session expired, Please Login again.",
            duration: 3000,
            position: 'buttom',
            dismissOnPageChange: false,
          }).present();
        
        this.navCtrl.setRoot(LoginPage);
      }
      
    });
    
    this.nativeStorage.getItem("token").then(data => this.token = data);
    
  }
  
  doLogout() {
    //this.myApp.logout();
    this.events.publish("auth:logout", this.token);
  }
  
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }
  
}
