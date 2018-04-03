import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Events} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';
import { HelpersProvider } from '../../providers/helpers/helpers';

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
  phone: AbstractControl;
  wedding_day: AbstractControl;
  venue: AbstractControl;
  
  user: any;
  userEmail: string = '';
  userName: string = '';
  userPhone: string = '';
  userWeddingDay: any = '';
  userVenue: any = '';
  weddingDayMin: any;
  weddingDayMax: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public helpersProvider: HelpersProvider,
    public apiProvider: ApiProvider,
    private formBuilder: FormBuilder,
    private events: Events
  ) {
    
    this.events.publish("auth:checkLogin");
    this.loading = this.helpersProvider.loadingPresent("Please Wait ...");
    
    this.getUser();
    this.editProfileForm = this.formBuilder.group({
      email: [this.userEmail, Validators.compose([Validators.required, Validators.email])],
      name: [this.userName, Validators.compose([Validators.required])],
      phone: [this.userPhone, Validators.compose([Validators.required])],
      wedding_day: [this.userWeddingDay, Validators.compose([Validators.required])],
      venue: [this.userVenue, Validators.compose([Validators.required])],
    });
    
    let d = new Date();
    
    let currentDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
    let maxDate = new Date(d.getFullYear() + 3, d.getMonth(), d.getDate(), 0, 0, 0);
    
    this.weddingDayMin = currentDate.getFullYear();
    this.weddingDayMax = maxDate.getFullYear();
  }
  
  getUser() {
    this.apiProvider.get('user/show/' + localStorage.getItem('user_id'), {}, {'Content-Type': 'application/json', "Authorization": "Bearer " + localStorage.getItem('token')})
      .then((data) => {
        this.user = JSON.parse(data.data).data;
        this.userEmail = this.user.email;
        this.userName = this.user.name;
        this.userPhone = this.user.phone;
        this.userWeddingDay = this.user.relation.wedding_day;
        this.userVenue = this.user.relation.venue;
        
        console.log(this.user);
        
        this.loading.dismiss();
        
        this.editProfileForm = this.formBuilder.group({
          email: [this.userEmail, Validators.compose([Validators.required, Validators.email])],
          name: [this.userName, Validators.compose([Validators.required])],
          phone: [this.userPhone, Validators.compose([Validators.required])],
          wedding_day: [this.userWeddingDay, Validators.compose([Validators.required])],
          venue: [this.userVenue, Validators.compose([Validators.required])],
        });
      })
      .catch((error) => {
        this.loading.dismiss();
        this.user = [];
        let result = JSON.parse(error.error);
        if (result.status == '401') {
          this.events.publish("auth:forceLogout", result.message);
        }
        this.helpersProvider.toastPresent(result.message);
        console.log(error);
      });
  }
  
  onSubmit(value:any) : void {
    if (this.editProfileForm.valid) {
      this.loading = this.helpersProvider.loadingPresent("Please Wait ...");
      
      let params = {
        "name": value.name,
        "email": value.email,
        "phone": value.phone,
        "wedding_day": value.wedding_day,
        "venue": value.venue
      };
      
      this.apiProvider.patch('user/update/' + localStorage.getItem("user_id"), params, {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")})
        .then((data) => {
          
          let result = JSON.parse(data.data);
          
          this.loading.dismiss();
          this.helpersProvider.toastPresent(result.message);
          
          this.navCtrl.setRoot("ProfilePage");
        })
        .catch((error) => {
          this.loading.dismiss();
          let result = JSON.parse(error.error);
          if (result.status == '401') {
            this.events.publish("auth:forceLogout", result.message);
          }
          this.helpersProvider.toastPresent(result.message);
          console.log(result);
        });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

}
