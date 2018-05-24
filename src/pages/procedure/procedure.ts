import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from '../../providers/api/api';
import {HelpersProvider} from '../../providers/helpers/helpers';

/**
 * Generated class for the ProcedurePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-procedure',
  templateUrl: 'procedure.html',
})
export class ProcedurePage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider, public helpersProvider: HelpersProvider) {

  }

  administrationPage() {
    this.navCtrl.push("ProcedureAdministrationPage");
  }

  schedulePaymentPage() {
    this.navCtrl.push("ProcedureSchedulePaymentPage");
  }

  schedulePreparationPage() {
    this.navCtrl.push("ProcedureSchedulePreparationPage");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProcedurePage');
  }

}
