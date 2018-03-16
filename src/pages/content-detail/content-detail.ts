import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the ContentDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-content-detail',
  templateUrl: 'content-detail.html',
})
export class ContentDetailPage {
  
  loading: any;
  contents: any = [];
  pageTitle: string = "Content Detail";

  constructor(public navCtrl: NavController, public navParams: NavParams, public helpersProvider: HelpersProvider, public api: ApiProvider) {
    if (localStorage.getItem("isLoggedIn") == null) {
        
      this.helpersProvider.toastPresent("Session expired, Please Login again.", );
      this.helpersProvider.clearLoggedIn();
      this.navCtrl.setRoot("LoginPage");
    }
    this.pageTitle = this.navParams.get('name');
    
    this.getContentDetails();
    this.loading = this.helpersProvider.loadingPresent("");
  }
  
  getContentDetails() {
    this.api.get('content-details/' + this.navParams.get('id'), {}, {'Content-Type': 'application/json', "Authorization": "Bearer " + localStorage.getItem('token')})
      .then((data) => {
        this.loading.dismiss();
        this.contents = JSON.parse(data.data).data;
        console.log(data.data);

      })
      .catch((error) => {
        this.loading.dismiss();
        this.contents = [];
        let result = JSON.parse(error.error);
        if (result.status == '401') {
          this.helpersProvider.toastPresent(result.message);
          this.helpersProvider.clearLoggedIn();
          this.navCtrl.setRoot("LoginPage");
        }
        console.log(error);
      });
  }
  
  saveContentDetail(id, value) {
    this.loading = this.helpersProvider.loadingPresent("Please Wait");
      
    this.api.patch('content-details/update/' + id, {"value": value}, {'Content-Type': 'application/json', "Authorization": "Bearer " + localStorage.getItem('token')})
    .then((data) => {
      this.loading.dismiss();
      let result = JSON.parse(data.data);
      this.contents = result.data;
      this.helpersProvider.toastPresent(result.message);
      console.log(this.contents);

    })
    .catch((error) => {
      this.loading.dismiss();
      this.contents = [];
      let result = JSON.parse(error.error);
      this.helpersProvider.toastPresent(result.message);
      if (result.status == '401') {
        this.helpersProvider.toastPresent(result.message);
        this.helpersProvider.clearLoggedIn();
        this.navCtrl.setRoot("LoginPage");
      }
      console.log(error);
    });
  }
  
  eventKeypressSaveContentDetail(event, id) {
    if (event.keyCode == 13) {
      this.saveContentDetail(id, event.target.value);
    }
  }
  
  eventChangeSaveContentDetail(event, id) {
    this.saveContentDetail(id, event.target.value);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContentDetailPage');
  }

}
