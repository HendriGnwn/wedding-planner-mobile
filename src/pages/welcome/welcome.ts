import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';

import { ApiProvider } from '../../providers/api/api';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

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
    
  public result: any = [{name:''}];

  constructor(private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider, platform: Platform) {
	  
    this.nativeStorage.getItem("isLoggedIn").then(data => {
      
      if (data) {
        this.navCtrl.setRoot(HomePage);
      }
      
    });
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
    this.navCtrl.push(LoginPage);
  }

}
