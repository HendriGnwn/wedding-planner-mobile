import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController} from 'ionic-angular';
import {Device} from '@ionic-native/device';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {TabsPage} from '../tabs/tabs';
import {RegisterPage} from '../register/register';
import {ForgotPasswordPage} from '../forgot-password/forgot-password';
import {ApiProvider} from '../../providers/api/api';

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
		public loadingCtrl: LoadingController,
		public navParams: NavParams,
		private viewCtrl: ViewController,
		private toastCtrl: ToastController,
		private device: Device,
    private formBuilder: FormBuilder) {
    
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
    
    if (localStorage.getItem("isLoggedIn") == "1") {
      this.navCtrl.setRoot(TabsPage);
    }
    
	}
  
  onSubmit(value:any) : void {
    if (this.loginForm.valid) {
      this.loading = this.loadingCtrl.create({
        content: "Authenticating ..."
      });
      this.loading.present();
      
      this.api.post('auth/login', {"email": value.email, "password": value.password, "firebase_token":"xxx", "device_number": this.device.uuid}, {'Content-Type':'application/json'})
        .then((data) => {
          
          let result = JSON.parse(data.data);
          
          localStorage.setItem("isLoggedIn", "1");
          localStorage.setItem("user", JSON.stringify(result.data));
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("user_id", result.data.id);
          
          this.loading.dismiss();
          this.toastCtrl.create({
            message: result.message,
            duration: 3000,
            position: 'buttom',
            dismissOnPageChange: false,
          }).present();
          
          this.navCtrl.setRoot(TabsPage);
        })
        .catch((error) => {
          this.loading.dismiss();
          console.log(error);
          
          let result = JSON.parse(error.error);
          
          this.toastCtrl.create({
            message: result.message,
            duration: 3000,
            position: 'buttom',
            dismissOnPageChange: false,
          }).present();
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
    this.navCtrl.push(RegisterPage);
  }
  
  goToForgotPasswordPage() {
    this.navCtrl.push(ForgotPasswordPage);
  }
}
