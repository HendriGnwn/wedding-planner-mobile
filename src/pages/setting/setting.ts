import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HelpersProvider } from "../../providers/helpers/helpers";
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-setting",
  templateUrl: "setting.html"
})
export class SettingPage {
  browserOptions: InAppBrowserOptions = {
    zoom: "no",
    toolbar: "yes"
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events,
    public helpersProvider: HelpersProvider,
    public inAppBrowser: InAppBrowser
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
      id: id,
      header: header
    });
  }

  goToReportProblem() {
    this.navCtrl.push("ReportProblemPage");
  }

  goToSupport() {
    this.helpersProvider.inAppBrowser.create(
      "http://agendanikah.com/support",
      "_blank",
      this.browserOptions
    );
  }

  doLogout() {
    this.events.publish("auth:logout", localStorage.getItem("token"));
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SettingPage");
  }
}
