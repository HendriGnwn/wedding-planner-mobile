import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, ModalController, AlertController } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProcedureSchedulePaymentPage');
  }

  addNew() {
    let modal = this.modalCtrl.create("ProcedureSchedulePaymentFormPage", {headerTitle: "Tambah Jadwal Pembayaran"});
    modal.present();
  }

  delete(id) {

  }

  pressOptions(params:any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Opsi", 
      buttons: [
        {
          text: 'Edit',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            let modal = this.modalCtrl.create("ProcedureSchedulePaymentFormPage", {headerTitle: "Edit Jadwal Pembayaran", data: {}});
            modal.present();
          }
        },{
          text: 'Delete',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            let alert = this.alertCtrl.create({
              title: 'Anda yakin ingin menghapus data ini?',
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
                    this.delete(1);
                  }
                }
              ]
            });
            alert.present();
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

  doRefresh(event) {

  }

}
