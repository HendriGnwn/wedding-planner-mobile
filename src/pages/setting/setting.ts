import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { EditProfilePage } from '../edit-profile/edit-profile';
import { RelationProfileDetailPage } from '../relation-profile-detail/relation-profile-detail';
import { StaticPage } from '../static/static';
import { ReportProblemPage } from '../report-problem/report-problem';
import { LoginPage } from '../login/login';
import {HelpersProvider} from '../../providers/helpers/helpers';

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
    private events: Events,
    private helpers: HelpersProvider
    ) {
    
    if (localStorage.getItem("isLoggedIn") == null) {
        
      this.helpers.toastPresent('Session expired, Please Login again.');

      this.navCtrl.setRoot(LoginPage);
      
    }
    
  }
  
  goToEditProfile() {
    this.navCtrl.push(EditProfilePage);
  }
  
  goToRelationProfile() {
    this.navCtrl.push(RelationProfileDetailPage);
  }
  
  goToStatic(id, header) {
    this.navCtrl.push(StaticPage, {
      'id':id,
      'header':header
    });
  }
  
  goToReportProblem() {
    this.navCtrl.push(ReportProblemPage);
  }
  
  doLogout() {
    this.events.publish("auth:logout", localStorage.getItem('token'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

}
