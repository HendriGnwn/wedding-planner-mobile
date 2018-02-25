import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';

import { LoginPage } from '../login/login';

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
    
  public result: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {
  }
  
  getConcept() {
      this.result = this.api.get('concepts', {}, {})
      .then((result) => {
		  return result.data;
		  //console.log(JSON.parse(result.data));
      })
      .catch((error) => {
          console.log("error");
          console.log(error);
		  return {};
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
	result = this.getConcept();
	  
	  console.log(result);
  }
  
  nextClick() {
    this.navCtrl.setRoot(LoginPage);
  }

}
