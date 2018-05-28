import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, ModalController, AlertController } from 'ionic-angular';

/**
 * Generated class for the ProcedureSchedulePreparationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-procedure-schedule-preparation',
  templateUrl: 'procedure-schedule-preparation.html',
})
export class ProcedureSchedulePreparationPage {

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
    console.log('ionViewDidLoad ProcedureSchedulePreparationPage');
  }

  addNew() {
    let modal = this.modalCtrl.create("ProcedureSchedulePreparationFormPage", {headerTitle: "Tambah Jadwal Persiapan"});
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
            let modal = this.modalCtrl.create("ProcedureSchedulePreparationFormPage", {headerTitle: "Edit Jadwal Persiapan", data: {}});
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
