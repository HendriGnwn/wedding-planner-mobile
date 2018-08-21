import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the CostDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cost-detail',
  templateUrl: 'cost-detail.html',
})
export class CostDetailPage {

  item = {
    details: []
  };
  details = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events
  ) {
    this.events.publish("auth:checkLogin");
    this.item = this.navParams.get("item");
    this.details = this.item.details;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CostDetailPage');
  }

}
