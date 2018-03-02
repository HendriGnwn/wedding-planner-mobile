import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { File } from '@ionic-native/file';

/*
  Generated class for the HelpersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelpersProvider {

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public file: File,
    public device: Device
    ) {
    
  }
  
  loadingPresent(content: string) {
    this.loadingCtrl.create({
      content: content
    }).present();
  }
  
  loadingDismiss() {
    this.loadingCtrl.create().dismissAll();
  }
  
  toastPresent(message:string, duration:any=3000, position:string='buttom') {
     this.toastCtrl.create({
        message: message,
        duration: duration,
        position: position,
        dismissOnPageChange: false,
      }).present();
  }
  
  

}
