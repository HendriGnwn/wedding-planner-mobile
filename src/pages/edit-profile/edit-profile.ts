import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
    
  loading: any;
  editProfileForm: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  gender: AbstractControl;
  phone: AbstractControl;
  wedding_day: AbstractControl;
  venue: AbstractControl;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public helpersProvider: HelpersProvider,
    public apiProvider: ApiProvider,
    private formBuilder: FormBuilder
  ) {
    
    if (localStorage.getItem("isLoggedIn") == null) {
        
      this.helpersProvider.toastPresent("Session expired, Please Login again.", );
      this.helpersProvider.clearLoggedIn();
      this.navCtrl.setRoot(LoginPage);
    }
    
    this.editProfileForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      name: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      wedding_day: ['', Validators.compose([Validators.required])],
      venue: ['', Validators.compose([Validators.required])],
    });
  
  }
  
  onSubmit(value:any) : void {
    if (this.editProfileForm.valid) {
      this.loading = this.helpersProvider.loadingPresent("Please Wait ...");
      
      let params = {
        "name": value.name,
        "email": value.email,
        "gender": value.gender,
        "phone": value.phone,
        "wedding_day": value.wedding_day,
        "venue": value.venue
      };
      
      this.apiProvider.patch('user/update/' + localStorage.getItem("user_id"), params, {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")})
        .then((data) => {
          
          let result = JSON.parse(data.data);
          
          this.loading.dismiss();
          this.helpersProvider.toastPresent(result.message);
          
          this.navCtrl.setRoot(ProfilePage);
        })
        .catch((error) => {
          this.loading.dismiss();
          console.log(error);
          
          let result = JSON.parse(error.error);
          
          console.log(result);
          
          this.helpersProvider.toastPresent(result.message);
        });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

}
