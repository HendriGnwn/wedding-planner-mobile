import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {ApiProvider} from '../../providers/api/api';
import {HelpersProvider} from '../../providers/helpers/helpers';

/**
 * Generated class for the ContentDetailModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-content-detail-modal',
  templateUrl: 'content-detail-modal.html',
})
export class ContentDetailModalPage {

  loading: any;
  contentDetailForm: FormGroup;
  name: AbstractControl;
  value: AbstractControl;
  headerTitle: string;
  content: any = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiProvider,
    public events: Events,
    public viewCtrl: ViewController,
    private helpersProvider: HelpersProvider,
    private formBuilder: FormBuilder) {
    
    this.events.publish("auth:checkLogin");
    
    this.contentDetailForm = this.formBuilder.group({
      name: [this.navParams.get('contentDetailName'), Validators.compose([Validators.required])],
      value: [this.navParams.get('contentDetailValue'), Validators.compose([Validators.required])],
    });
    
    if (this.navParams.get('contentDetailId') == null) {
      this.headerTitle = "Tambah baru";
    } else {
      this.headerTitle = "Edit " + this.navParams.get('contentDetailName');
    }
  }
  
  onSubmit(value:any) : void {
    if (this.contentDetailForm.valid) {
      this.loading = this.helpersProvider.loadingPresent("Please Wait ...");
      
      let params = {"name": value.name, "value": value.value};
      let url = '';
      if (this.navParams.get('contentDetailId') == null) {
        url = 'content-details/store/' + this.navParams.get('contentId');
        this.api.post(url, params, {'Content-Type':'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')})
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
            this.dismiss(null);
          });
      } else {
        url = 'content-details/update/' + this.navParams.get('contentDetailId');
        this.api.patch(url, params, {'Content-Type':'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')})
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
            this.dismiss(null);
          });
      }
      
      
    }
  }
  
  dismiss(data: any) {
    this.viewCtrl.dismiss(data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContentDetailModalPage');
  }

}
