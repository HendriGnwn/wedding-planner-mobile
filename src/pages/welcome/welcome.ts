import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { FCM } from '@ionic-native/fcm';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
    
  isLoggedIn: any;
  public result: any = [{name:''}];

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider, platform: Platform, public fcm: FCM ) {
    
    this.isLoggedIn = localStorage.getItem("isLoggedIn");
	  
    platform.ready().then(() => {
      if (this.isLoggedIn == true) {
        this.navCtrl.setRoot("TabsPage");
      }
    });
    
//    this.fcm.getToken().then(token => {
//      console.log(token);
//      // Your best bet is to here store the token on the user's profile on the
//      // Firebase database, so that when you want to send notifications to this 
//      // specific user you can do it from Cloud Functions.
//    });
    
  }
  
  getConcept() {
      this.api.get('concepts', {}, {})
      .then((result) => {
		  this.result = JSON.parse(result.data).data;
		  console.log(this.result);
      })
      .catch((error) => {
          console.log("error Ini");
          console.log(error);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  
  nextClick() {
    this.navCtrl.push("LoginPage");
  }

}
