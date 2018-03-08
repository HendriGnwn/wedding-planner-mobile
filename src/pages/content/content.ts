import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { ApiProvider } from '../../providers/api/api';
import { LoginPage } from '../login/login';
import { ContentDetailPage } from '../content-detail/content-detail';


/**
 * Generated class for the ContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'content.html',
})
export class ContentPage {
  
  pageTitle: string = "Content";
  contents: any = [];
  loading: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public helpersProvider: HelpersProvider, 
    public api: ApiProvider,
    public modalCtrl: ModalController) {
    if (localStorage.getItem("isLoggedIn") == null) {
        
      this.helpersProvider.toastPresent("Session expired, Please Login again.", );
      this.helpersProvider.clearLoggedIn();
      this.navCtrl.setRoot(LoginPage);
    }
    this.pageTitle = this.navParams.get('name');
    
    this.getContents();
    this.loading = this.helpersProvider.loadingPresent("");
  }
  
  getContents() {
    this.api.get('contents/' + this.navParams.get('id'), {}, {'Content-Type': 'application/json', "Authorization": "Bearer " + localStorage.getItem('token')})
      .then((data) => {
        this.loading.dismiss();
        this.contents = JSON.parse(data.data).data;
        console.log(this.contents);
        console.log(data.data);

      })
      .catch((error) => {
        this.loading.dismiss();
        this.contents = [];
        let result = JSON.parse(error.error);
        if (result.status == '401') {
          this.helpersProvider.toastPresent(result.message);
          this.helpersProvider.clearLoggedIn();
          this.navCtrl.setRoot(LoginPage);
          
        }
        console.log(this.contents);
        console.log(error);
      });
  }
  
  goToDetail(id:any, name: string) {
    this.navCtrl.push(ContentDetailPage, {
      "id": id,
      "name": name
    });
  }
  
  addContent() {
    let profileModal = this.modalCtrl.create(ContentDetailPage, { userId: 8675309 });
    profileModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContentPage');
  }

}
