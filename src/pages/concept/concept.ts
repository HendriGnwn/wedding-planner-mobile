import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, ActionSheetController, Platform, AlertController } from 'ionic-angular';
import {ApiProvider} from '../../providers/api/api';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the ConceptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-concept',
  templateUrl: 'concept.html',
})
export class ConceptPage {
  
  loading: any;
  concepts: any = [];
  userRelationConcepts: any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public api: ApiProvider, 
    public helpersProvider: HelpersProvider, 
    public actionSheetCtrl: ActionSheetController,
    public events: Events,
    public modalCtrl: ModalController,
    public platform: Platform,
    public alertCtrl: AlertController,
  ) {
  
    this.events.publish("auth:checkLogin");
    this.getConcepts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConceptPage');
  }
  
  getConcepts() {
    this.api.get('concepts', {}, {'Content-Type':'application/json', 'Authorization':'Bearer ' + localStorage.getItem("token")})
      .then((data) => {

        let result = JSON.parse(data.data);

        this.concepts = result.data;
        this.userRelationConcepts = result.concepts;
        console.log(this.concepts);
        console.log(data.data);

      })
      .catch((error) => {
        this.concepts = [];
        let result = JSON.parse(error.error);
        if (result.status == '401') {
          this.events.publish("auth:forceLogout", result.message);
        }
      });
  }
  
  goToDetail(id: any, name: string, isCustomConcept:any = 0) {
    this.navCtrl.push("ContentPage", {
      "id": id,
      "name": name,
      "isCustomConcept": isCustomConcept
    });
  }

  addNew() {
    let modal = this.modalCtrl.create("ConceptModalPage", {headerTitle: "Update Concept", isNewRecord: true});
    modal.onDidDismiss(data => {
      if (data == null) {
      } else {
        this.userRelationConcepts = data;
      }
    });
    modal.present();
  }

  update(item) {
    let modal = this.modalCtrl.create("ConceptModalPage", {headerTitle: "Update Concept", isNewRecord: false, model: item});
    modal.onDidDismiss(data => {
      if (data == null) {
      } else {
        this.userRelationConcepts = data;
      }
    });
    modal.present();
  }

  delete(id) {
    this.loading = this.helpersProvider.loadingPresent("");
    this.api.delete('concepts/delete/' + id, {}, {'Content-Type': 'application/json', "Authorization": "Bearer " + localStorage.getItem('token')})
      .then((data) => {
        this.loading.dismiss();
        let result = JSON.parse(data.data);
        this.userRelationConcepts = result.data;
        console.log(this.userRelationConcepts);
        this.helpersProvider.toastPresent(result.message);
      })
      .catch((error) => {
        this.loading.dismiss();
        let result = JSON.parse(error.error);
        if (result.status == '401') {
          this.events.publish("auth:forceLogout", result.message);
        }
        this.helpersProvider.toastPresent(result.message);
        console.log(error);
      });
  }

  pressDetail(event, item) {
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
                    this.delete(item.id);
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
            this.update(item);
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
  
  goToNotification() {
    this.navCtrl.push("NotificationPage");
  }

}
