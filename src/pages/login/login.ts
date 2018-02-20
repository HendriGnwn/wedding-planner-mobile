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

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider) {
    api.post('auth/login', {'email': 'hendri.gnw@gmail.com'}, {'Content-Type': 'application/json'})
	.then(data => {
       console.log(data.data);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  goToHome() {
	  this.navCtrl.setRoot(HomePage);
  }

}
