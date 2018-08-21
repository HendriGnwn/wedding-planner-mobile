import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the CostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cost',
  templateUrl: 'cost.html',
})
export class CostPage {
  
  costs: any = [];
  grandCost: any = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public apiProvider: ApiProvider, 
    public helpers: HelpersProvider, 
    public events: Events
  ) {
    this.events.publish("auth:checkLogin");
    this.getCost();
  }
  
  getCost() {
    this.apiProvider.get('costs', {}, {'Content-Type': 'application/json', "Authorization": "Bearer " + localStorage.getItem('token')})
      .then((data) => {
        let result = JSON.parse(data.data);
        this.costs = result.data;
        this.grandCost = result.grand_cost;
        console.log(data);
      })
      .catch((error) => {
        this.costs = [];
        let result = JSON.parse(error.error);
        if (result.status == '401') {
          this.events.publish("auth:forceLogout", result.message);
        }
        console.log(error);
      });
  }

  goToCostDetail(item) {
    this.navCtrl.push("CostDetailPage", {item: item});
  }

  doRefresh(event) {
    this.getCost();
    setTimeout(() => {
      console.log("Async operation has ended");
      event.complete();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CostPage');
  }
  
  goToNotification() {
    this.navCtrl.push("NotificationPage");
  }

}
