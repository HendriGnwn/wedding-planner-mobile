import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider) {
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
        console.log(error);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CostPage');
  }

}
