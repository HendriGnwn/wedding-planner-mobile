import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from '../../providers/api/api';
import {HelpersProvider} from '../../providers/helpers/helpers';

/**
 * Generated class for the ProcedureAdministrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-procedure-administration',
  templateUrl: 'procedure-administration.html',
})
export class ProcedureAdministrationPage {

  administrations: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider, public helpersProvider: HelpersProvider) {
    this.getAdministrations();
  }

  getAdministrations() {
    this.apiProvider.get('procedure', {}, {'Content-Type':'application/json'})
      .then((data) => {
        
        let result = JSON.parse(data.data);
        
        this.administrations = result.data;
      })
      .catch((error) => {
        let result = JSON.parse(error.error);
        this.helpersProvider.toastPresent(result.message);
        this.administrations = [];
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProcedureAdministrationPage');
  }
}
