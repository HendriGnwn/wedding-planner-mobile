import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, Events, App} from 'ionic-angular';
import {Device} from '@ionic-native/device';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {ApiProvider} from '../../providers/api/api';
import {HelpersProvider} from '../../providers/helpers/helpers';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	loading: any;

  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  
  loginErrors: any;
  loginError: any;

	constructor(
		public navCtrl: NavController,
		public api: ApiProvider,
		public navParams: NavParams,
		private viewCtrl: ViewController,
    private helpersProvider: HelpersProvider,
    private device: Device,
    public app: App,
		private events: Events,
    private formBuilder: FormBuilder) {
    
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
    
    if (localStorage.getItem("isLoggedIn") == "1") {
      this.navCtrl.setRoot("TabsPage");
    }
	}
  
  onSubmit(value:any) : void {
    if (this.loginForm.valid) {
      this.loading = this.helpersProvider.loadingPresent("Authenticating ...");

      let params = {
        "email": value.email, 
        "password": value.password, 
        "firebase_token": localStorage.getItem("firebaseToken"), 
        "user_id_token": localStorage.getItem("userIdToken"), 
        "device_number": this.device.uuid
      };

      console.log(params);
      
      this.api.post('auth/login', params, {'Content-Type':'application/json'})
        .then((data) => {
          
          let result = JSON.parse(data.data);
          
          this.events.publish("auth:setLogin", {
            user: result,
            isLoggedIn: true
          });
          
          this.loading.dismiss();
          this.helpersProvider.toastPresent(result.message);
          
          this.app.getRootNav().setRoot("TabsPage");
        })
        .catch((error) => {
          this.loading.dismiss();
          console.log(error);
          
          let result = JSON.parse(error.error);
          this.helpersProvider.toastPresent(result.message);
        });
    }
  }

	ionViewWillEnter() {
		this.viewCtrl.showBackButton(false);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}
  
  goToRegisterPage() {
    this.navCtrl.push("RegisterTermPage");
  }
  
  goToForgotPasswordPage() {
    this.navCtrl.push("ForgotPasswordPage");
  }
}
