import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Slides } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';
import {InAppBrowser, InAppBrowserOptions} from '@ionic-native/in-app-browser';

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
  
  fileUrl: string;
  detailFileUrl: string;
  
  defaultFileUrl: string;
  
  slideFeatures: any = {};
  browserOptions: InAppBrowserOptions = {
      zoom: 'no',
      toolbar: 'yes'
    }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public helpersProvider: HelpersProvider,
    public inAppBrowser: InAppBrowser
  ) {
  
    this.events.publish("auth:checkLogin");
    
    this.vendor = this.navParams.get('vendor');
    console.log(this.vendor);
    this.fileUrl = this.helpersProvider.getBaseUrl() + 'files/vendors/';
    this.detailFileUrl = this.helpersProvider.getBaseUrl() + 'files/vendor-details/';
    this.defaultFileUrl = this.detailFileUrl + 'default.png'; 
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
  
  clickInstagram() {
    this.helpersProvider.inAppBrowser.create('https://www.instagram.com/' + this.vendor.instagram, '_blank', this.browserOptions);
  }
  
  clickWebsite() {
    this.helpersProvider.inAppBrowser.create('http://' + this.vendor.website, '_blank', this.browserOptions);
  }
  
  showPicture(name, url) {
    this.helpersProvider.photoViewer.show(url, name);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorDetailPage');
  }

}
