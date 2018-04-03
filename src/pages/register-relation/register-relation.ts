import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {Device} from '@ionic-native/device';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {ApiProvider} from '../../providers/api/api';
import {HelpersProvider} from '../../providers/helpers/helpers';

/**
 * Generated class for the RegisterRelationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-relation',
  templateUrl: 'register-relation.html',
})
export class RegisterRelationPage {
  
  loading: any;
  requestToken: any;
  
  registerForm: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  phone: AbstractControl;
  password: AbstractControl;
  confirm_password: AbstractControl;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public apiProvider: ApiProvider,
    public helpersProvider: HelpersProvider,
    public device: Device,
    public events: Events,
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
    
    this.registerForm = this.formBuilder.group({
      //email: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirm_password: ['', Validators.compose([Validators.required])],
    }, {validator: this.matchingPasswords('password', 'confirm_password')});
    
    this.loading.dismiss();
  }
  
  onSubmit(value:any) : void {
    if (this.registerForm.valid) {
      this.loading = this.helpersProvider.loadingPresent("Please Wait ...");
      
      let params = {
        "name": value.name,
        "phone": value.phone,
        "password": value.password,
        "confirm_password": value.confirm_password,
        "registered_device_number": this.device.uuid,
        "firebase_token": "xxx",
        "registered_token": this.requestToken
      };
      
      this.apiProvider.post('auth/register-invitation', params, {'Content-Type':'application/json'})
        .then((data) => {
          
          let result = JSON.parse(data.data);
          
          this.events.publish("auth:setLogin", {
            user: result
          });
          
          this.loading.dismiss();
          this.helpersProvider.toastPresent(result.message);
          
          this.navCtrl.setRoot("TabsPage");
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
    console.log('ionViewDidLoad RegisterRelationPage');
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
