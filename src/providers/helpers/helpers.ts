import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { File } from '@ionic-native/file';
import { DatePicker } from '@ionic-native/date-picker';
import { CallNumber } from '@ionic-native/call-number';

/*
  Generated class for the HelpersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelpersProvider {
  
  BASE_URL: string = 'http://agendanikah.com/dev/public/';

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public file: File,
    public device: Device,
    public datePicker: DatePicker,
    public callNumber: CallNumber
    ) {
    
  }
  
  getBaseUrl() {
    return this.BASE_URL;
  }
  
  loadingPresent(content: string) {
    let loading = this.loadingCtrl.create({
      content: content
    });
    loading.present();
    return loading;
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
  
  datepickerShow() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
    );
  }
  
  clearLoggedIn() {
    localStorage.setItem('isLoggedIn', null);
    localStorage.setItem('token', null);
    localStorage.setItem('user', null);
    localStorage.setItem("user_id", null);
  }
  
  

}
