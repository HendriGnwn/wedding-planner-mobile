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
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider, public helpersProvider: HelpersProvider) {
    this.getAdministrations();
  }

  getAdministrations() {
    this.apiProvider.get('procedure-administrations', {}, {'Content-Type':'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")})
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

  checked(item) {
    if (!item.procedure_administrations) {
      return false;
    }

    return (item.procedure_administrations.checklist == '1') ? true : false;
  }

  checking(events, item) {
    this.loading = this.helpersProvider.loadingPresent("");
    let params = {
      "procedure_id": item.id,
      "checklist": item.checklist == true ? '1' : '0'
    };
    this.apiProvider.post('procedure-administrations', params, {'Content-Type':'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")})
      .then((data) => {
        let result = JSON.parse(data.data);
        console.log(result);
        this.administrations = result.data;
        this.loading.dismiss();
        this.helpersProvider.toastPresent(result.message);
      })
      .catch((error) => {
        let result = JSON.parse(error.error);
        console.log(result);
        this.helpersProvider.toastPresent(result.message);
        this.loading.dismiss();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProcedureAdministrationPage');
  }
}
