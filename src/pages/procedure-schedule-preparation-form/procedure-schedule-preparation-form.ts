import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {ApiProvider} from '../../providers/api/api';
import {HelpersProvider} from '../../providers/helpers/helpers';
import moment from 'moment';

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

  model:any = {
    id: '',
    name: '',
    venue: '',
    preparation_at: ''
  }
  loading: any;
  headerTitle: string;
  preparationForm: FormGroup;
  name: AbstractControl;
  venue: AbstractControl;
  date: AbstractControl;
  dateMin: any;
  dateMax: any;
  isNewRecord: boolean = false;

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
    }
    
    let preparationAt = '';
    if (this.model.preparation_at != '') {
      let date = moment(this.model.preparation_at).locale('id').format('YYYY-MM-DD');
      let time = moment(this.model.preparation_at).locale('id').format('HH:mm:ss');
      preparationAt = date +'T'+ time +'.000Z';
    }
    this.preparationForm = this.formBuilder.group({
      name: [this.model.name, Validators.compose([Validators.required])],
      venue: [this.model.venue, Validators.compose([Validators.required])],
      date: [preparationAt, Validators.compose([Validators.required])],
    });

    let d = new Date();
    
    let currentDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
    let maxDate = new Date(d.getFullYear() + 3, d.getMonth(), d.getDate(), 0, 0, 0);
    
    this.dateMin = currentDate.getFullYear();
    this.dateMax = maxDate.getFullYear();
  }

  onSubmit(value: any) {
    if (this.preparationForm.valid) {
      this.loading = this.helpersProvider.loadingPresent("Please Wait ...");
      
      let params = {
        "name": value.name,
        "venue": value.venue,
        "preparation_at": value.date
      };
      
      if (this.isNewRecord == true) {
        this.apiProvider.post('procedure-preparation', params, {'Content-Type':'application/json', 'Authorization':'Bearer ' + localStorage.getItem("token")})
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
        this.apiProvider.patch('procedure-preparation/' + this.model.id, params, {'Content-Type':'application/json', 'Authorization':'Bearer ' + localStorage.getItem("token")})
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
    console.log('ionViewDidLoad ProcedureSchedulePreparationFormPage');
  }

  dismiss(params:any = []) {
    this.viewCtrl.dismiss(params);
  }

}
