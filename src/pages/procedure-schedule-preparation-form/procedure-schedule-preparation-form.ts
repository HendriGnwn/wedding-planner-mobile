import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ProcedureSchedulePreparationFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-procedure-schedule-preparation-form',
  templateUrl: 'procedure-schedule-preparation-form.html',
})
export class ProcedureSchedulePreparationFormPage {

  headerTitle: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.headerTitle = this.navParams.get("headerTitle");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProcedureSchedulePreparationFormPage');
  }

  dismiss(params:any) {
    this.viewCtrl.dismiss(params);
  }

}
