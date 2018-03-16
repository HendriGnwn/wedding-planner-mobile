import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the RelationProfileDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-relation-profile-detail',
  templateUrl: 'relation-profile-detail.html',
})
export class RelationProfileDetailPage {
  
  loading: any;
  relationProfileForm: FormGroup;
  email: AbstractControl;
  
  user: any;
  relation: any;
  userEmail: any = '';
  isFormRelation: any = false;
  isRelationDetail: any = false;

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
      this.navCtrl.setRoot("LoginPage");

    }
    
    this.getUser();
    this.relationProfileForm = this.formBuilder.group({
      email: [this.userEmail, Validators.compose([Validators.required, Validators.email])]
    });
  }
  
  getUser() {
    this.apiProvider.get('user/show/' + localStorage.getItem('user_id'), {}, {'Content-Type': 'application/json', "Authorization": "Bearer " + localStorage.getItem('token')})
      .then((data) => {
        this.user = JSON.parse(data.data).data;
        this.relation = this.user.relation.partner;
        this.userEmail = this.relation.email;
        if (this.relation.id == null) {
          this.isFormRelation = true;
          this.isRelationDetail = false;
        } else {
          this.isFormRelation = false;
          this.isRelationDetail = true;
        }
        
        this.relationProfileForm = this.formBuilder.group({
          email: [this.userEmail, Validators.compose([Validators.required, Validators.email])]
        });
      })
      .catch((error) => {
        this.loading.dismiss();
        this.user = [];
        this.relation = [];
        let result = JSON.parse(error.error);
        if (result.status == '401') {
          this.helpersProvider.toastPresent(result.message);
          this.helpersProvider.clearLoggedIn();
          this.navCtrl.setRoot("LoginPage");
          
        }
        console.log(error);
      });
  }
  
  onSubmit(value:any) : void {
    if (this.relationProfileForm.valid) {
      this.loading = this.helpersProvider.loadingPresent("Please Wait ...");
      
      let params = {
        "email": value.email,
      };
      
      this.apiProvider.patch('user/re-send-relation/' + localStorage.getItem("user_id"), params, {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")})
        .then((data) => {
          
          let result = JSON.parse(data.data);
          
          this.loading.dismiss();
          this.helpersProvider.toastPresent(result.message);
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
    console.log('ionViewDidLoad RelationProfileDetailPage');
  }

}
