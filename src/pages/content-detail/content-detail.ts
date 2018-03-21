import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App, ActionSheetController, Platform, AlertController } from 'ionic-angular';
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
  inputValueDisabled: any = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public helpersProvider: HelpersProvider, 
    public api: ApiProvider, 
    public platform: Platform, 
    public modalCtrl: ModalController, 
    public actionSheetCtrl: ActionSheetController, 
    public alertCtrl: AlertController, 
    public app: App
  ) {
    if (localStorage.getItem("isLoggedIn") == null) {
        
      this.helpersProvider.toastPresent("Session expired, Please Login again.", );
      this.helpersProvider.clearLoggedIn();
      this.app.getRootNav().setRoot("LoginPage");
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
  
  clickDetail(contentDetail) {
    console.log(contentDetail);
    if (contentDetail.is_noted == "1") {
      this.navCtrl.push("ContentDetailNotePage", {"contentDetail": contentDetail});
      return;
    }
    
    if (contentDetail.is_photo == "1") {
      this.navCtrl.push("ContentDetailListPage", {"contentDetail": contentDetail});
      return;
    }
    
    if (contentDetail.is_video == "1") {
      this.navCtrl.push("ContentDetailListPage", {"contentDetail": contentDetail});
      return;
    }
  }
  
  eventKeypressSaveContentDetail(event, id) {
  }
  
  eventChangeSaveContentDetail(event, id) {
    this.saveContentDetail(id, event.target.value);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContentDetailPage');
  }
  
  addContentDetail() {
    let modal = this.modalCtrl.create("ContentDetailModalPage", {contentId: this.navParams.get('id'), contentDetailId: null, contentDetailName: null, contentDetailValue: null });
    modal.onDidDismiss((data) => {
      this.inputValueDisabled = false;
      if (data != null) {
        this.contents = data;
      }
    });
    modal.present();
  }
  
  updateContentDetail(id, name, value) {
    let modal = this.modalCtrl.create("ContentDetailModalPage", {contentId: this.navParams.get('id'), contentDetailId: id, contentDetailName: name, contentDetailValue: value });
    modal.onDidDismiss((data) => {
      this.inputValueDisabled = false;
      if (data != null) {
        this.contents = data;
      }
    });
    modal.present();
  }
  
  deleteContentDetail(id) {
    this.loading = this.helpersProvider.loadingPresent("");
    this.api.delete('content-details/delete/' + id, {}, {'Content-Type': 'application/json', "Authorization": "Bearer " + localStorage.getItem('token')})
      .then((data) => {
        this.loading.dismiss();
        let result = JSON.parse(data.data);
        this.contents = result.data;
        console.log(this.contents);
        console.log(data.data);
        
        this.inputValueDisabled = false;
        
        this.helpersProvider.toastPresent(result.message);

      })
      .catch((error) => {
        this.loading.dismiss();
        let result = JSON.parse(error.error);
        
        if (result.status == '401') {
          this.helpersProvider.toastPresent(result.message);
          this.helpersProvider.clearLoggedIn();
          this.navCtrl.setRoot("LoginPage");
        }
        
        this.inputValueDisabled = false;
        
        this.helpersProvider.toastPresent(result.message);
      });
  }
  
  contentDetailPressed(e, id, name, value) {
    this.inputValueDisabled = true;
    let actionSheet = this.actionSheetCtrl.create({
      title: name,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            
            let alert = this.alertCtrl.create({
              title: 'Anda yakin ingin menghapus data ini?',
              buttons: [
                {
                  text: 'Tidak',
                  handler: () => {
                    console.log('Disagree clicked');
                    this.inputValueDisabled = false;
                  }
                },
                {
                  text: 'Ya',
                  handler: () => {
                    this.deleteContentDetail(id);
                  }
                }
              ]
            });
            alert.present();
          }
        },{
          text: 'Edit',
          icon: !this.platform.is('ios') ? 'ios-create' : null,
          handler: () => {
            this.updateContentDetail(id, name, value);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.inputValueDisabled = false;
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
