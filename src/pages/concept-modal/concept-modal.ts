import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {ApiProvider} from '../../providers/api/api';
import {HelpersProvider} from '../../providers/helpers/helpers';

/**
 * Generated class for the ConceptModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-concept-modal',
  templateUrl: 'concept-modal.html',
})
export class ConceptModalPage {

  loading: any;
  form: FormGroup;
  name: AbstractControl;
  headerTitle: string;
  model: any = {
    id: '',
    name: ''
  };
  isNewRecord: boolean;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiProvider,
    public events: Events,
    public viewCtrl: ViewController,
    private helpersProvider: HelpersProvider,
    private formBuilder: FormBuilder) {
    
    this.events.publish("auth:checkLogin");
    this.isNewRecord = this.navParams.get("isNewRecord");
    this.headerTitle = this.navParams.get("headerTitle");
    if (this.isNewRecord == false) {
      this.model = this.navParams.get("model");
    }
    
    this.form = this.formBuilder.group({
      name: [this.model.name, Validators.compose([Validators.required])],
    });
  }

  onSubmit(value:any) : void {
    if (this.form.valid) {
      this.loading = this.helpersProvider.loadingPresent("Please Wait ...");
      
      let params = {"name": value.name};
      if (this.isNewRecord) {
        this.api.post('concepts/store', params, {'Content-Type':'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')})
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
            if (result.status == '401') {
              this.events.publish("auth:forceLogout", result.message);
            }
            this.helpersProvider.toastPresent(result.message);
          });
      } else {
        this.api.patch('concepts/update/' + this.model.id, params, {'Content-Type':'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')})
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
            if (result.status == '401') {
              this.events.publish("auth:forceLogout", result.message);
            }
            this.helpersProvider.toastPresent(result.message);
          });
      }
    }
  }
  
  dismiss(data: any) {
    this.viewCtrl.dismiss(data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConceptModalPage');
  }

}
