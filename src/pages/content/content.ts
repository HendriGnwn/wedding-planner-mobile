import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController, Platform, AlertController } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { ApiProvider } from '../../providers/api/api';


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
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController) {
    if (localStorage.getItem("isLoggedIn") == null) {
        
      this.helpersProvider.toastPresent("Session expired, Please Login again.", );
      this.helpersProvider.clearLoggedIn();
      this.navCtrl.setRoot("LoginPage");
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
          this.navCtrl.setRoot("LoginPage");
          
        }
        console.log(this.contents);
        console.log(error);
      });
  }
  
  goToDetail(id:any, name: string) {
    this.navCtrl.push("ContentDetailPage", {
      "id": id,
      "name": name
    });
  }
  
  addContent() {
    let modal = this.modalCtrl.create("ContentModalPage", {concept: this.navParams.get('id'), contentId: null, contentName: null });
    modal.onDidDismiss((data) => {
      if (data != null) {
        this.contents = data;
      }
    });
    modal.present();
  }
  
  updateContent(id, name) {
    let modal = this.modalCtrl.create("ContentModalPage", {concept: this.navParams.get('id'), contentId: id, contentName: name });
    modal.onDidDismiss((data) => {
      if (data != null) {
        this.contents = data;
      }
    });
    modal.present();
  }
  
  deleteContent(id) {
    this.loading = this.helpersProvider.loadingPresent("");
    this.api.delete('contents/delete/' + id, {}, {'Content-Type': 'application/json', "Authorization": "Bearer " + localStorage.getItem('token')})
      .then((data) => {
        this.loading.dismiss();
        let result = JSON.parse(data.data);
        this.contents = result.data;
        console.log(this.contents);
        console.log(data.data);
        
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
        
        this.helpersProvider.toastPresent(result.message);
        
        console.log(this.contents);
        console.log(error);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContentPage');
  }
  
  contentPressed(e, id, name) {
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
              message: 'Menghapus data ini akan berakibat hilangnya data dalam detail data ini.',
              buttons: [
                {
                  text: 'Tidak',
                  handler: () => {
                    console.log('Disagree clicked');
                  }
                },
                {
                  text: 'Ya',
                  handler: () => {
                    this.deleteContent(id);
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
            this.updateContent(id, name);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
