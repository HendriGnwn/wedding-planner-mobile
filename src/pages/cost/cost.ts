import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { LoginPage } from '../login/login';
import {NotificationPage} from '../notification/notification';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider, public helpers: HelpersProvider, public app: App) {
    
    if (localStorage.getItem("isLoggedIn") == null) {
        
      this.helpers.loadingPresent('Session expired, Please Login again.');

      this.app.getRootNav().setRoot(LoginPage);
      
    }
    
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
          this.helpers.toastPresent(result.message);
          this.helpers.clearLoggedIn();
          this.app.getRootNav().setRoot(LoginPage);
        }
        console.log(error);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CostPage');
  }
  
  goToNotification() {
    this.navCtrl.push(NotificationPage);
  }

}
