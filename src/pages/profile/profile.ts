import { Component } from '@angular/core';
import { NavController, ViewController, ToastController, Events } from 'ionic-angular';

import {LoginPage} from '../login/login';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  
  token: string;

  constructor(public navCtrl: NavController, private viewCtrl: ViewController, private events: Events, private toastCtrl: ToastController) {
    
    if (localStorage.getItem("isLoggedIn") == null) {
        
      this.toastCtrl.create({
          message: "Session expired, Please Login again.",
          duration: 3000,
          position: 'buttom',
          dismissOnPageChange: false,
        }).present();

      this.navCtrl.setRoot(LoginPage);
      
    }
    
    this.token = localStorage.getItem("token");
    
  }
  
  doLogout() {
    //this.myApp.logout();
    this.events.publish("auth:logout", this.token);
  }
  
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }
  

}
