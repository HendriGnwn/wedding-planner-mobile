import { Component } from '@angular/core';
import { NavController, ViewController, ToastController, Events } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ApiProvider } from '../../providers/api/api';

import {LoginPage} from '../login/login';

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

  constructor(
    public navCtrl: NavController, 
    private viewCtrl: ViewController, 
    private events: Events, 
    private toastCtrl: ToastController, 
    public file: File,
    private camera: Camera,
    public apiProvider: ApiProvider) {
    
    if (localStorage.getItem("isLoggedIn") == null) {
        
      this.toastCtrl.create({
          message: "Session expired, Please Login again.",
          duration: 3000,
          position: 'buttom',
          dismissOnPageChange: false,
        }).present();

      this.navCtrl.setRoot(LoginPage);
      
    }

    this.token = localStorage.getItem('token');
    
    this.getUser();
    
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
  
  doLogout() {
    //this.myApp.logout();
    this.events.publish("auth:logout", this.token);
  }
  
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }
  

}
