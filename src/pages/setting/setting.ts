import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private events: Events
    ) {
    this.events.publish("auth:checkLogin");
  }
  
  goToEditProfile() {
    this.navCtrl.push("EditProfilePage");
  }
  
  goToRelationProfile() {
    this.navCtrl.push("RelationProfileDetailPage");
  }
  
  goToStatic(id, header) {
    this.navCtrl.push("StaticPage", {
      'id':id,
      'header':header
    });
  }
  
  goToReportProblem() {
    this.navCtrl.push("ReportProblemPage");
  }
  
  doLogout() {
    this.events.publish("auth:logout", localStorage.getItem('token'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

}
