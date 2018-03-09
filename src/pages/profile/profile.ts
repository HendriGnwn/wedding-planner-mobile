import { Component,  } from '@angular/core';
import { Platform, NavController, ViewController, ToastController, Events, App } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ApiProvider } from '../../providers/api/api';
import { HelpersProvider } from '../../providers/helpers/helpers';

import {LoginPage} from '../login/login';
import {SettingPage} from '../setting/setting';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  
  token: any;
  relation_name: any;
  venue: any;
  wedding_day: any;
  user: any = {};
  dirs: any;
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
  days: any;
  hours: any;
  minutes: any;
  seconds: any;
  bannerHeight: any;

  constructor(
    public navCtrl: NavController, 
    private viewCtrl: ViewController, 
    private events: Events,
    private toastCtrl: ToastController, 
    public file: File,
    private camera: Camera,
    public apiProvider: ApiProvider,
    public helpersProvider: HelpersProvider,
    public app: App,
    public platform: Platform
    ) {
    
    if (localStorage.getItem("isLoggedIn") == null) {
        
      this.toastCtrl.create({
          message: "Session expired, Please Login again.",
          duration: 3000,
          position: 'buttom',
          dismissOnPageChange: false,
        }).present();
      this.helpersProvider.clearLoggedIn();
      this.app.getRootNav().setRoot(LoginPage);
      
    }

    this.token = localStorage.getItem('token');
    
    this.getUser();
    
    this.getCountdown();

    setInterval(() => { 
      this.getCountdown(); 
    }, 1000);
    
    if (this.platform.is('ios')) {
      this.bannerHeight = 200;
    } else {
      this.bannerHeight = 200;
    }
  }

  getUser() {
    this.apiProvider.get('user/show/' + localStorage.getItem('user_id'), {}, {'Content-Type': 'application/json', "Authorization": "Bearer " + localStorage.getItem('token')})
      .then((data) => {
        
        let result = JSON.parse(data.data);
        
        this.relation_name = result.data.relation.relation_name;
        this.wedding_day = result.data.relation.wedding_day;
        this.venue = result.data.relation.venue;
        this.user = result.data;

      })
      .catch((error) => {
        this.user = {};
        let result = JSON.parse(error.error);
        if (result.status == '401') {
          this.helpersProvider.toastPresent(result.message);
          this.helpersProvider.clearLoggedIn();
          this.app.getRootNav().setRoot(LoginPage);
        }
        console.log(error);
      });
  }
  
  openFile() {
//    this.file.resolveLocalFilesystemUrl(this.file.dataDirectory);
//    console.log(this.file.dataDirectory);
//    this.file.listDir(this.file.applicationDirectory, '').then(
//  (files) => {
//    // do something
//    this.dirs = files;
//    console.log('test');
//  }
//).catch(ç
//  (err) => {
    // do something
//    console.log('test1');
//  }
//);
    this.camera.getPicture(this.options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    console.log(base64Image);
   }, (err) => {
    // Handle error
      console.log(err);
   });
  }
  
  getCountdown() {
    if (!this.wedding_day) {
      return;
    }
    
    let target_date = null;
    
    if(this.platform.is('ios')) {
      let t = this.wedding_day.split(/[- :]/);
      // Apply each element to the Date function
      target_date = new Date(t[0], t[1]-1, t[2], 0, 0, 0).getTime();
    } else {
      target_date = Date.parse(this.wedding_day + ' 00:00:00'); // set the countdown date
    }
    
    // find the amount of "seconds" between now and target
    let current_date = new Date().getTime();
    
    let seconds_left = (target_date - current_date) / 1000;
    
    if (current_date > target_date) {
      seconds_left = 0;
    }
    
    this.days = this.pad(Math.floor(seconds_left / 86400) );
    seconds_left = seconds_left % 86400;

    this.hours = this.pad(Math.floor(seconds_left / 3600) );
    seconds_left = seconds_left % 3600;

    this.minutes = this.pad(Math.floor(seconds_left / 60) );
    this.seconds = this.pad(Math.floor( seconds_left % 60 ) );
  }

  pad(n) {
    return (n < 10 ? '0' : '') + n;
  }
  
  goToSetting() {
    this.navCtrl.push(SettingPage);
  }
  
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }
  

}
