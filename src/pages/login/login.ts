import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController} from 'ionic-angular';
import {Device} from '@ionic-native/device';
import {NativeStorage} from '@ionic-native/native-storage';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {HomePage} from '../home/home';
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
		private nativeStorage: NativeStorage,
    private formBuilder: FormBuilder) {
    
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
    
    this.nativeStorage.getItem("isLoggedIn").then(data => {
      
      if (data) {
        this.navCtrl.setRoot(HomePage);
      }
      
    });
    
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
          
          this.nativeStorage.setItem("isLoggedIn", true);
          this.nativeStorage.setItem("user", result.data);
          this.nativeStorage.setItem("token", result.data.token);
          
          this.loading.dismiss();
          this.toastCtrl.create({
            message: "Login Success",
            duration: 3000,
            position: 'buttom',
            dismissOnPageChange: false,
          }).present();
          
          this.navCtrl.setRoot(HomePage);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

	ionViewWillEnter() {
		this.viewCtrl.showBackButton(false);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}
}
