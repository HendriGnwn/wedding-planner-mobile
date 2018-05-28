import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {ApiProvider} from '../../providers/api/api';
import {HelpersProvider} from '../../providers/helpers/helpers';

/**
 * Generated class for the ProcedureSchedulePaymentFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-procedure-schedule-payment-form',
  templateUrl: 'procedure-schedule-payment-form.html',
})
export class ProcedureSchedulePaymentFormPage {

  loading: any;
  headerTitle: string;
  paymentForm: FormGroup;
  name: AbstractControl;
  account_number: AbstractControl;
  account_bank: AbstractControl;
  account_holder: AbstractControl;
  payment_total: AbstractControl;
  payment_total_1: AbstractControl;
  payment_total_2: AbstractControl;
  payment_total_3: AbstractControl;
  payment_date_1: AbstractControl;
  payment_date_2: AbstractControl;
  payment_date_3: AbstractControl;
  dateMin: any;
  dateMax: any;

  paymentTotal:any = 0;
  paymentTotal1:any = 0;
  paymentTotal2:any = 0;
  paymentTotal3:any = 0;
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public apiProvider: ApiProvider,
    public helpersProvider: HelpersProvider,
    public formBuilder: FormBuilder
  ) {
    this.headerTitle = this.navParams.get("headerTitle");
    this.paymentForm = this.formBuilder.group({
      name: [this.navParams.get('name'), Validators.compose([Validators.required])],
      account_number: [this.navParams.get('account_number'), Validators.compose([Validators.required])],
      account_bank: [this.navParams.get('account_bank'), Validators.compose([Validators.required])],
      account_holder: [this.navParams.get('account_holder'), Validators.compose([Validators.required])],
      payment_total: [this.navParams.get('payment_total'), Validators.compose([Validators.required])],
      payment_total_1: [this.navParams.get('payment_total_1'), Validators.compose([Validators.required])],
      payment_total_2: [this.navParams.get('payment_total_2'), Validators.compose([Validators.required])],
      payment_total_3: [this.navParams.get('payment_total_3'), Validators.compose([Validators.required])],
      payment_date_1: [this.navParams.get('payment_date_1'), Validators.compose([Validators.required])],
      payment_date_2: [this.navParams.get('payment_date_2'), Validators.compose([Validators.required])],
      payment_date_3: [this.navParams.get('payment_date_3'), Validators.compose([Validators.required])],
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
    console.log('ionViewDidLoad ProcedureSchedulePaymentFormPage');
  }

  dismiss(params:any) {
    this.viewCtrl.dismiss(params);
  }

  updatePaymentTotal(event, paymentTo) {
    switch (paymentTo) {
      case 1:
        this.paymentTotal1 = (event.target.value == null) ? 0 : event.target.value;
        break;
      case 2:
        this.paymentTotal2 = (event.target.value == null) ? 0 : event.target.value;
        break;
      case 3:
        this.paymentTotal3 = (event.target.value == null) ? 0 : event.target.value;
        break;
    }

    this.paymentTotal = parseFloat(this.paymentTotal1) + parseFloat(this.paymentTotal2) + parseFloat(this.paymentTotal3);
  }

}
