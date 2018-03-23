import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the ContentDetailNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-content-detail-note',
  templateUrl: 'content-detail-note.html',
})
export class ContentDetailNotePage {
  
  contentDetail: any = {};
  contentDetails: any = [];
  loading: any;
  contentDetailNoteForm: FormGroup;
  note: AbstractControl;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public helpersProvider: HelpersProvider, 
    public api: ApiProvider,
    private formBuilder: FormBuilder,
    public events: Events
  ) {
  
    this.events.publish("auth:checkLogin");
  
    this.contentDetail = this.navParams.get("contentDetail");
    
    this.contentDetailNoteForm = this.formBuilder.group({
      note: [this.contentDetail.value, Validators.compose([Validators.required])],
    });
  }
  
  onSubmit(value:any) : void {
    if (this.contentDetailNoteForm.valid) {
      this.loading = this.helpersProvider.loadingPresent("Please Wait ...");
      this.loading.present();
      
      this.api.patch('content-details/update/' + this.contentDetail.id, {"value": value.note}, {'Content-Type': 'application/json', "Authorization": "Bearer " + localStorage.getItem('token')})
        .then((data) => {
          this.loading.dismiss();
          let result = JSON.parse(data.data);
          this.helpersProvider.toastPresent(result.message);
          this.contentDetails = result.data;
          this.navCtrl.pop();
        })
        .catch((error) => {
          this.loading.dismiss();
          let result = JSON.parse(error.error);
          if (result.status == '401') {
            this.events.publish("auth:forceLogout", result.message);
          }
          this.helpersProvider.toastPresent(result.message);
          console.log(error);
        });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContentDetailNotePage');
  }
}
