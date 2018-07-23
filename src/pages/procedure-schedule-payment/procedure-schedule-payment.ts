import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, ModalController, AlertController } from 'ionic-angular';
import {ApiProvider} from '../../providers/api/api';
import {HelpersProvider} from '../../providers/helpers/helpers';

/**
 * Generated class for the ProcedureSchedulePaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-procedure-schedule-payment',
  templateUrl: 'procedure-schedule-payment.html',
})
export class ProcedureSchedulePaymentPage {

  loading: any;
  models: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public apiProvider: ApiProvider,
    public helpersProvider: HelpersProvider
  ) {
    this.getModels();
  }

  getModels() {
    this.loading = this.helpersProvider.loadingPresent("");
    this.apiProvider.get('procedure-payment', {}, {'Content-Type':'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")})
      .then((data) => {
        let result = JSON.parse(data.data);
        this.models = result.data;
        this.loading.dismiss();
      })
      .catch((error) => {
        let result = JSON.parse(error.error);
        this.helpersProvider.toastPresent(result.message);
        this.models = [];
        this.loading.dismiss();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProcedureSchedulePaymentPage');
  }

  addNew() {
    let modal = this.modalCtrl.create("ProcedureSchedulePaymentFormPage", {headerTitle: "Tambah Jadwal Pembayaran", isNewRecord:true});
    modal.onDidDismiss(data => {
      if (data == null) {
      } else {
        this.models = data;
      }
    });
    modal.present();
  }

  delete(id) {
    this.loading = this.helpersProvider.loadingPresent("");
    this.apiProvider.delete('procedure-payment/' + id, {}, {'Content-Type':'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")})
      .then((data) => {
        let result = JSON.parse(data.data);
        this.models = result.data;
        this.loading.dismiss();
      })
      .catch((error) => {
        let result = JSON.parse(error.error);
        this.helpersProvider.toastPresent(result.message);
        this.loading.dismiss();
      });
  }

  pressOptions(params:any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Opsi",
      buttons: [
        {
          text: "Edit",
          icon: !this.platform.is("ios") ? "create" : null,
          handler: () => {
            let modal = this.modalCtrl.create(
              "ProcedureSchedulePaymentFormPage",
              {
                headerTitle: "Edit Jadwal Pembayaran",
                data: params,
                isNewRecord: false
              }
            );
            modal.onDidDismiss(data => {
              if (data == null) {
              } else {
                this.models = data;
              }
            });
            modal.present();
          }
        },
        {
          text: "Delete",
          role: "destructive",
          icon: !this.platform.is("ios") ? "trash" : null,
          handler: () => {
            let alert = this.alertCtrl.create({
              title: "Anda yakin ingin menghapus data ini?",
              buttons: [
                {
                  text: "Tidak",
                  handler: () => {
                    console.log("Disagree clicked");
                  }
                },
                {
                  text: "Ya",
                  handler: () => {
                    this.delete(params.id);
                  }
                }
              ]
            });
            alert.present();
          }
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    actionSheet.present();
  }

  doRefresh(event) {
    this.getModels();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.complete();
    }, 2000);
  }

}
