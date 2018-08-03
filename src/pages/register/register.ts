import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Events, App} from 'ionic-angular';
import {Device} from '@ionic-native/device';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {ApiProvider} from '../../providers/api/api';
import {HelpersProvider} from '../../providers/helpers/helpers';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  
  loading: any;

  registerForm: FormGroup;
  name: AbstractControl;
  gender: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  confirm_password: AbstractControl;

  constructor(
		public navCtrl: NavController,
		public api: ApiProvider,
		public navParams: NavParams,
		private device: Device,
    private events: Events,
    public app: App,
    private formBuilder: FormBuilder,
    private helpers: HelpersProvider) {
    
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      gender: ['', null],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
      confirm_password: ['', Validators.compose([Validators.required])],
    }, {validator: this.matchingPasswords('password', 'confirm_password')});
    
    if (localStorage.getItem("isLoggedIn") == "1") {
      this.navCtrl.setRoot("TabsPage");
    }
	}
  
  onSubmit(value:any) : void {
    if (this.registerForm.valid) {
      this.loading = this.helpers.loadingPresent("Please Wait ...");
      
      let params = {
        "name": value.name,
        "gender": value.gender,
        "email": value.email,
        "password": value.password,
        "confirm_password": value.confirm_password,
        "firebase_token": localStorage.getItem("firebaseToken"), 
        "user_id_token": localStorage.getItem("userIdToken"), 
        "registered_device_number": this.device.uuid,
        "device_number": this.device.uuid
      };
      
      console.log(params);
      
      this.api.post('auth/register', params, {'Content-Type':'application/json'})
        .then((data) => {
          
          let result = JSON.parse(data.data);
          
          this.events.publish("auth:setLogin", {
            user: result
          });
          
          this.loading.dismiss();
          this.helpers.toastPresent(result.message);
          
          this.app.getRootNav().setRoot("TabsPage");
        })
        .catch((error) => {
          this.loading.dismiss();
          console.log(error);
          
          let result = JSON.parse(error.error);
          
          this.helpers.toastPresent(result.message);
        });
    }
  }
  
  datePickerShow() {
    this.helpers.datepickerShow();
  }
  
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
