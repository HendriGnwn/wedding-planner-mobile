import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, TextInput } from 'ionic-angular';
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
  description: AbstractControl;
  dateMin: any;
  dateMax: any;

  @ViewChild('paymentTotal1') paymentTotal1: TextInput;
  @ViewChild('paymentTotal2') paymentTotal2: TextInput;
  @ViewChild('paymentTotal3') paymentTotal3: TextInput;

  paymentTotal:any = 0;

  model: any = {
    id: '',
    name: '',
    account_number: '',
    account_bank: '',
    account_holder: '',
    payment_total: '',
    installment_total_1: '',
    installment_total_2: '',
    installment_total_3: '',
    installment_date_1: '',
    installment_date_2: '',
    installment_date_3: '',
    description: ''
  }
  isNewRecord: boolean;
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public apiProvider: ApiProvider,
    public helpersProvider: HelpersProvider,
    public formBuilder: FormBuilder
  ) {
    this.headerTitle = this.navParams.get("headerTitle");
    this.isNewRecord = this.navParams.get("isNewRecord");
    if (!this.isNewRecord) {
      this.model = this.navParams.get('data');
      this.paymentTotal = this.model.payment_total;
    }
    this.paymentForm = this.formBuilder.group({
      name: [this.model.name, Validators.compose([Validators.required])],
      account_number: [this.model.account_number, Validators.compose([Validators.required])],
      account_bank: [this.model.account_bank, Validators.compose([Validators.required])],
      account_holder: [this.model.account_holder, Validators.compose([Validators.required])],
      payment_total: [this.model.payment_total, Validators.compose([Validators.required])],
      payment_total_1: [this.model.installment_total_1, Validators.compose([Validators.nullValidator])],
      payment_total_2: [this.model.installment_total_2, Validators.compose([Validators.nullValidator])],
      payment_total_3: [this.model.installment_total_3, Validators.compose([Validators.required])],
      payment_date_1: [this.model.installment_date_1, Validators.compose([Validators.nullValidator])],
      payment_date_2: [this.model.installment_date_2, Validators.compose([Validators.nullValidator])],
      payment_date_3: [this.model.installment_date_3, Validators.compose([Validators.required])],
      description: [this.model.description, Validators.compose([Validators.nullValidator])],
    });

    let d = new Date();
    
    let currentDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
    let maxDate = new Date(d.getFullYear() + 3, d.getMonth(), d.getDate(), 0, 0, 0);
    
    this.dateMin = currentDate.getFullYear();
    this.dateMax = maxDate.getFullYear();
  }

  onSubmit(value: any) {
    if (this.paymentForm.valid) {
      this.loading = this.helpersProvider.loadingPresent("Please Wait ...");
      
      let params = {
        "name": value.name,
        "description": value.description,
        "account_number": value.account_number,
        "account_bank": value.account_bank,
        "account_holder": value.account_holder,
        "payment_total": value.payment_total,
        "installment_total_1": value.payment_total_1,
        "installment_total_2": value.payment_total_2,
        "installment_total_3": value.payment_total_3,
        "installment_date_1": value.payment_date_1,
        "installment_date_2": value.payment_date_2,
        "installment_date_3": value.payment_date_3
      };
      
      if (this.isNewRecord == true) {
        this.apiProvider.post('procedure-payment', params, {'Content-Type':'application/json', 'Authorization':'Bearer ' + localStorage.getItem("token")})
          .then((data) => {
            
            let result = JSON.parse(data.data);
            
            this.loading.dismiss();
            this.helpersProvider.toastPresent(result.message);
            this.dismiss(result.data);
          })
          .catch((error) => {
            this.loading.dismiss();
            console.log(error);
            
            let result = JSON.parse(error.error);
            
            this.helpersProvider.toastPresent(result.message);
          });
      } else {
        this.apiProvider.patch('procedure-payment/' + this.model.id, params, {'Content-Type':'application/json', 'Authorization':'Bearer ' + localStorage.getItem("token")})
          .then((data) => {
            
            let result = JSON.parse(data.data);
            
            this.loading.dismiss();
            this.helpersProvider.toastPresent(result.message);
            this.dismiss(result.data);
          })
          .catch((error) => {
            this.loading.dismiss();
            console.log(error);
            
            let result = JSON.parse(error.error);
            
            this.helpersProvider.toastPresent(result.message);
          });
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProcedureSchedulePaymentFormPage');
  }

  dismiss(params:any = []) {
    this.viewCtrl.dismiss(params);
  }

  updatePaymentTotal(event, paymentTo) {
    let total1 = this.paymentTotal1.value ? this.paymentTotal1.value : '0';
    let total2 = this.paymentTotal2.value ? this.paymentTotal2.value : '0';
    let total3 = this.paymentTotal3.value ? this.paymentTotal3.value : '0';
    this.paymentTotal = parseFloat(total1) + parseFloat(total2) + parseFloat(total3);
  }

}
