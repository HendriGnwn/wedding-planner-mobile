import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {ApiProvider} from '../../providers/api/api';
import {HelpersProvider} from '../../providers/helpers/helpers';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  
  loading: any;
  forgotForm: FormGroup;
  email: AbstractControl;
  
  forgotErrors: any;
  forgotError: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiProvider,
		public helperProviders: HelpersProvider,
    private formBuilder: FormBuilder) {
    
    this.forgotForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
    
    if (localStorage.getItem("isLoggedIn") == "1") {
      this.navCtrl.setRoot("TabsPage");
    }
    
  }
  
  onSubmit(value:any) : void {
    if (this.forgotForm.valid) {
      this.loading = this.helperProviders.loadingPresent("Please Wait ...");
      
      this.api.post('auth/forgot-password', {"email": value.email}, {'Content-Type':'application/json'})
        .then((data) => {
          
          let result = JSON.parse(data.data);
          
          this.forgotError = false;
          this.forgotErrors = {};
          
          this.loading.dismiss();
          this.helperProviders.toastPresent(result.message);
          
          this.navCtrl.setRoot("LoginPage");
        })
        .catch((error) => {
          this.loading.dismiss();
          console.log(error);
          
          let result = JSON.parse(error.error);
          
          this.forgotError = true;
          this.forgotErrors = result.validators;
          
          console.log(this.forgotErrors);
          this.helperProviders.toastPresent(result.message);
        });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

}
