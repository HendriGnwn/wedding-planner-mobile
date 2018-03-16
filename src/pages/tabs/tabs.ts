import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the TabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  
  @ViewChild('tabs') tabs;
  
  procedureRoot = "ProcedurePage";
  costRoot = "CostPage";
  conceptRoot = "ConceptPage";
  vendorRoot = "VendorPage";
  profileRoot = "ProfilePage";


  constructor(public navCtrl: NavController) {}
  
  ionViewDidEnter() {
  }

}
