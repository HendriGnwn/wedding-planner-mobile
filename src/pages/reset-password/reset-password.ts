import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {ApiProvider} from '../../providers/api/api';
import {HelpersProvider} from '../../providers/helpers/helpers';

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  loading: any;
  requestToken: any;
  
  forgotForm: FormGroup;
  password: AbstractControl;
  confirm_password: AbstractControl;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public apiProvider: ApiProvider,
    public helpersProvider: HelpersProvider,
    public formBuilder: FormBuilder
  ) {
    this.requestToken = this.navParams.get('token');
    this.loading = this.helpersProvider.loadingPresent("");
    
    if (!this.requestToken) {
      this.helpersProvider.toastPresent("Sorry, Token is not found or expired.");
      this.loading.dismiss();
      setInterval(() => {
        this.navCtrl.setRoot("WelcomePage");
      }, 3000);
    }
    
    this.forgotForm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required])],
      confirm_password: ['', Validators.compose([Validators.required])],
    }, {validator: this.matchingPasswords('password', 'confirm_password')});
    this.loading.dismiss();
  }

  onSubmit(value:any) : void {
    if (this.forgotForm.valid) {
      this.loading = this.helpersProvider.loadingPresent("Please Wait ...");
      
      let params = {
        "password": value.password,
        "confirm_password": value.confirm_password
      };
      
      console.log(params);
      
      this.apiProvider.post('auth/reset-password?confirm=' + this.requestToken, params, {'Content-Type':'application/json'})
        .then((data) => {
          let result = JSON.parse(data.data);
          this.loading.dismiss();
          this.helpersProvider.toastPresent(result.message);
          this.navCtrl.setRoot("LoginPage");
        })
        .catch((error) => {
          this.loading.dismiss();
          console.log(error);
          let result = JSON.parse(error.error);
          this.helpersProvider.toastPresent(result.message);
        });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }
  
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

}
