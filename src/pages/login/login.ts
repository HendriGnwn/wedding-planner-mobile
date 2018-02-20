import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  goToHome() {
  console.log("testse");
	  this.api.post('auth/login', {"email": "hendri.gnw@gmail.com", "password": "admin123", "firebase_token":"xxx", "device_number":"xxx"}, {'Content-Type':'application/json'})
	  .then((data) => {
         console.log(data.data);
		 console.log("success");
		 alert('coba');
      })
      .catch((error) => {
	     console.log("error");
         console.log(error);
      });
	  //this.navCtrl.setRoot(HomePage);
  }

}
