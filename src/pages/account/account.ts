import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HelpersProvider} from '../../providers/helpers/helpers';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  defaultPhoto: any = "assets/imgs/profile.png";
  browserOptions: InAppBrowserOptions = {
    zoom: "no",
    toolbar: "yes"
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private helpersProvider: HelpersProvider, public inAppBrowser: InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  doUploadPhoto() {
    this.navCtrl.push("LoginPage", {}, {animate: true});
  }

  goToLogin() {
    this.navCtrl.push("LoginPage", {}, {animate: true});
  }

  goToRegister() {
    this.navCtrl.push("RegisterPage", {}, {animate: true});
  }

  goToStatic(id, header) {
    this.navCtrl.push("StaticPage", {
      id: id,
      header: header
    });
  }

  goToSetting() {
    this.navCtrl.push("SettingPage");
  }

  goToSupport() {
    this.helpersProvider.inAppBrowser.create(
      "http://agendanikah.com/support",
      "_blank",
      this.browserOptions
    );
  }
}
