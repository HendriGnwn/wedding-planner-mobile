import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {ApiProvider} from '../../providers/api/api';
import {HelpersProvider} from '../../providers/helpers/helpers';

/**
 * Generated class for the ContentModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-content-modal',
  templateUrl: 'content-modal.html',
})
export class ContentModalPage {

  loading: any;
  contentForm: FormGroup;
  name: AbstractControl;
  headerTitle: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiProvider,
    public viewCtrl: ViewController,
		public events: Events,
    private helpersProvider: HelpersProvider,
    private formBuilder: FormBuilder) {
    
    this.contentForm = this.formBuilder.group({
      name: [this.navParams.get('contentName'), Validators.compose([Validators.required])],
    });
    
    this.events.publish("auth:checkLogin");
    
    if (this.navParams.get('contentId') == null) {
      this.headerTitle = "Tambah baru";
    } else {
      this.headerTitle = "Edit " + this.navParams.get('contentName');
    }
    
  }
  
  onSubmit(value:any) : void {
    if (this.contentForm.valid) {
      this.loading = this.helpersProvider.loadingPresent("Please Wait ...");
      
      let params = {"name": value.name};
      let url = '';
      if (this.navParams.get('contentId') == null) {
        url = 'contents/store/' + this.navParams.get('concept');
        this.api.post(url, params, {'Content-Type':'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')})
          .then((data) => {
            this.loading.dismiss();
            let result = JSON.parse(data.data);
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
        url = 'contents/update/' + this.navParams.get('contentId');
        this.api.patch(url, params, {'Content-Type':'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')})
          .then((data) => {
            this.loading.dismiss();
            let result = JSON.parse(data.data);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContentModalPage');
  }
  
  dismiss(data: any) {
    this.viewCtrl.dismiss(data);
  }

}
