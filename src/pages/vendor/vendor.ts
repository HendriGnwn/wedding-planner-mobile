import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NotificationPage} from '../notification/notification';

/**
 * Generated class for the VendorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vendor',
  templateUrl: 'vendor.html',
})
export class VendorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorPage');
  }
  
  goToNotification() {
    this.navCtrl.push(NotificationPage);
  }

}
