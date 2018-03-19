import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Slides } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the VendorDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vendor-detail',
  templateUrl: 'vendor-detail.html',
})
export class VendorDetailPage {
  
  @ViewChild(Slides) slides: Slides;

  vendor: any = {};
  phone:any = null;
  
  slideFeatures: any = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public app: App,
    public helpersProvider: HelpersProvider
  ) {
  
    if (localStorage.getItem("isLoggedIn") == null) {
        
      this.helpersProvider.toastPresent("Session expired, Please Login again.");
      this.helpersProvider.clearLoggedIn();
      this.app.getRootNav().setRoot("LoginPage");
      
    }
    
    this.vendor = this.navParams.get('vendor');
    this.phone = this.vendor.phone;
    this.slideFeatures = {
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        paginationClickable: true,
        paginationBulletRender: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        }
    };
  
  }
  
  callPhone() {
    this.helpersProvider.callNumber.callNumber(this.phone, true)
      .then(() => {})
      .catch(() => {});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorDetailPage');
  }

}
