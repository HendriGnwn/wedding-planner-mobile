import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the ContentDetailListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-content-detail-list',
  templateUrl: 'content-detail-list.html',
})
export class ContentDetailListPage {
  
  pageTitle: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events
  ) {
    this.events.publish("auth:checkLogin");
    this.pageTitle = 'Detail';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContentDetailListPage');
  }

}
