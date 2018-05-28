import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {ApiProvider} from '../../providers/api/api';
import {HelpersProvider} from '../../providers/helpers/helpers';

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

  loading: any;
  headerTitle: string;
  preparationForm: FormGroup;
  name: AbstractControl;
  venue: AbstractControl;
  date: AbstractControl;
  dateMin: any;
  dateMax: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public apiProvider: ApiProvider,
    public helpersProvider: HelpersProvider,
    public formBuilder: FormBuilder
  ) {
    this.headerTitle = this.navParams.get("headerTitle");
    this.preparationForm = this.formBuilder.group({
      name: [this.navParams.get('name'), Validators.compose([Validators.required])],
      venue: [this.navParams.get('venue'), Validators.compose([Validators.required])],
      date: [this.navParams.get('date'), Validators.compose([Validators.required])],
    });

    let d = new Date();
    
    let currentDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
    let maxDate = new Date(d.getFullYear() + 3, d.getMonth(), d.getDate(), 0, 0, 0);
    
    this.dateMin = currentDate.getFullYear();
    this.dateMax = maxDate.getFullYear();
  }

  onSubmit(value: any) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProcedureSchedulePreparationFormPage');
  }

  dismiss(params:any) {
    this.viewCtrl.dismiss(params);
  }

}
