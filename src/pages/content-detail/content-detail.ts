import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { ApiProvider } from '../../providers/api/api';
import { LoginPage } from '../login/login';
import { ContentDetailListPage } from '../content-detail-list/content-detail-list';

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

      this.navCtrl.setRoot(LoginPage);
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
          this.navCtrl.setRoot(LoginPage);
        }
        console.log(error);
      });
  }
  
  inputKeypress(event, id) {
    if (event.keyCode == 13) {
      console.log(id);
      console.log(event.keyCode);
      console.log(event.target.value);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContentDetailPage');
  }

}
