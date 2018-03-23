import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the ReportProblemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-problem',
  templateUrl: 'report-problem.html',
})
export class ReportProblemPage {

  loading: any;
  reportProblemForm: FormGroup;
  category: AbstractControl;
  description: AbstractControl;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiProvider,
    private helpersProvider: HelpersProvider,
    private formBuilder: FormBuilder,
    public events: Events) {
      
    this.events.publish("auth:checkLogin");
    
    this.reportProblemForm = this.formBuilder.group({
      category: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])]
    });
    
  }
  
  onSubmit(value:any) : void {
    if (this.reportProblemForm.valid) {
      this.loading = this.helpersProvider.loadingPresent("Please Wait ...");
      this.loading.present();
      
      let params = {"category": value.category, "description": value.description};
      
      this.api.post('report-problem', params, {'Content-Type':'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')})
        .then((data) => {
          
          let result = JSON.parse(data.data);
          
          this.navCtrl.pop();
          
          this.loading.dismiss();
          this.helpersProvider.toastPresent(result.message);
          
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportProblemPage');
  }

}
