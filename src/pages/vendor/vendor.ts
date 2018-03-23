import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HelpersProvider } from '../../providers/helpers/helpers';

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
  
  vendors: any = [];
  fileThumbUrl: string;
  exceptionFileThumbUrl: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public apiProvider: ApiProvider,
    public helpersProvider: HelpersProvider) {
    
    this.events.publish("auth:checkLogin");
    
    this.fileThumbUrl = this.helpersProvider.getBaseUrl() + 'files/vendors/thumbs/';
    this.exceptionFileThumbUrl = this.helpersProvider.getBaseUrl() + 'files/vendors/thumbs/default.png';
    this.getVendors();
    
  }
  
  getVendors() {
    this.apiProvider.get('vendor', {}, {'Content-Type': 'application/json', "Authorization": "Bearer " + localStorage.getItem('token')})
      .then((data) => {
        
        let result = JSON.parse(data.data);
        
        this.vendors = result.data;
        
        console.log(result);

      })
      .catch((error) => {
        let result = JSON.parse(error.error);
        
        if (result.status == '401') {
          this.events.publish("auth:forceLogout", result.message);
        }
        this.helpersProvider.toastPresent(result.message);
        console.log(error);
      });
  }
  
  goToVendorDetail(vendor) {
    this.navCtrl.push("VendorDetailPage", {vendor: vendor});
  }
  
  doRefresh(e) {
    this.getVendors();
    setTimeout(() => {
      console.log('Async operation has ended');
      e.complete();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorPage');
  }
  
  goToNotification() {
    this.navCtrl.push("NotificationPage");
  }

}
