import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Tabs } from 'ionic-angular';

/**
 * Generated class for the TabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main-tabs',
  templateUrl: 'main-tabs.html'
})
export class MainTabsPage {
  
  @ViewChild('maintab') maintab: Tabs;
  
  tab1Root = "VendorPage";
  tab2Root = "AccountPage";
  selectedIndex: any = 1;


  constructor(public navCtrl: NavController) {
    this.selectedIndex = 1;
  }
}
