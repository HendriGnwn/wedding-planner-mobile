import { Component } from '@angular/core';
import { NavController, ViewController, ToastController, Events } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  
  token: string;
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
    private camera: Camera) {
    
    if (localStorage.getItem("isLoggedIn") == null) {
        
      this.toastCtrl.create({
          message: "Session expired, Please Login again.",
          duration: 3000,
          position: 'buttom',
          dismissOnPageChange: false,
        }).present();

      this.navCtrl.setRoot(LoginPage);
      
    }
    
    this.token = localStorage.getItem("token");
    
  }
  
  openFile() {
    this.file.resolveLocalFilesystemUrl(this.file.dataDirectory);
    console.log(this.file.dataDirectory);
    this.file.listDir(this.file.applicationDirectory, '').then(
  (files) => {
    // do something
    this.dirs = files;
    console.log('test');
  }
).catch(
  (err) => {
    // do something
    console.log('test1');
  }
);
//    this.camera.getPicture(this.options).then((imageData) => {
//    // imageData is either a base64 encoded string or a file URI
//    // If it's base64:
//    let base64Image = 'data:image/jpeg;base64,' + imageData;
//    console.log(base64Image);
//   }, (err) => {
//    // Handle error
//      console.log(err);
//   });
  }
  
  doLogout() {
    //this.myApp.logout();
    this.events.publish("auth:logout", this.token);
  }
  
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }
  

}
