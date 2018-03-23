import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ModalController, Events } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  
  loading: any;
  notifications: any = [];
  fileThumbUrl: string;
  exceptionFileThumbUrl: string;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public app: App,
    public apiProvider: ApiProvider,
    public modalCtrl: ModalController,
    public events: Events,
    public helpersProvider: HelpersProvider
  ) {
    
    this.events.publish("auth:checkLogin");
    this.loading = this.helpersProvider.loadingPresent("");
    
    this.fileThumbUrl = this.helpersProvider.getBaseUrl() + 'files/messages/thumbs/';
    this.exceptionFileThumbUrl = this.helpersProvider.getBaseUrl() + 'files/messages/thumbs/default.png';
    this.getNotifications();
  }
  
  getNotifications() {
    this.apiProvider.get('messages', {}, {'Content-Type': 'application/json', "Authorization": "Bearer " + localStorage.getItem('token')})
      .then((data) => {
        let result = JSON.parse(data.data);
        this.loading.dismiss();
        this.notifications = result.data;
        console.log(result);
      })
      .catch((error) => {
        let result = JSON.parse(error.error);
        this.loading.dismiss();
        if (result.status == '401') {
          this.events.publish("auth:forceLogout", result.message);
        }
        console.log(error);
      });
  }
  
  goToDetail(notification) {
    let modal = this.modalCtrl.create("NotificationModalPage", {notification: notification });
    modal.present();
  }
  
  doRefresh(e) {
    this.getNotifications();
    setTimeout(() => {
      console.log('Async operation has ended');
      e.complete();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

}
