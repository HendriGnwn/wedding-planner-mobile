import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ActionSheetController, Platform, AlertController } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { ApiProvider } from '../../providers/api/api';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';


/**
 * Generated class for the ContentDetailListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-content-detail-list',
  templateUrl: 'content-detail-list.html',
})
export class ContentDetailListPage {
  
  loading: any;
  pageTitle: any;
  contentDetail: any = {};
  details: any = [];
  fileUrl: string;
  fileThumbUrl: string;
  defaultFileUrl: string;
  defaultFileThumbUrl: string;
  dirs: any;
  cameraOptions: CameraOptions = {
    allowEdit: true,
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.CAMERA
  }
  openFileOptions: CameraOptions = {
    allowEdit: true,
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  };
 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public apiProvider: ApiProvider,
    public helpersProvider: HelpersProvider,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform, 
    public alertCtrl: AlertController, 
    public file: File,
    private camera: Camera,
  ) {
    this.events.publish("auth:checkLogin");
    this.contentDetail = this.navParams.get("contentDetail");
    this.loading = this.helpersProvider.loadingPresent("");
    this.pageTitle = this.contentDetail.name;
    this.fileUrl = this.helpersProvider.BASE_URL + 'files/content-detail-lists/';
    this.fileThumbUrl = this.fileUrl + 'thumbs/';
    this.defaultFileUrl = this.fileUrl + 'default.png';
    this.defaultFileThumbUrl = this.fileThumbUrl + 'default.png';
    this.getData();
  }
  
  getData() {
    this.apiProvider.get('content-detail-lists/' + this.contentDetail.id, {}, {'Content-Type':'application/json', "Authorization": "Bearer " + localStorage.getItem("token")})
        .then((data) => {
          this.loading.dismiss();
          let result = JSON.parse(data.data);
          console.log(result);
          this.details = result.data.content_detail_list;
        })
        .catch((error) => {
          this.loading.dismiss();
          this.details = [];
          let result = JSON.parse(error.error);
          this.helpersProvider.toastPresent(result.message);
          console.log(error);
        });
  }
  
  openActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Upload File", 
      buttons: [
        {
          text: 'Open Camera',
          icon: !this.platform.is('ios') ? 'ios-camera' : null,
          handler: () => {
            this.storeFromCamera();
          }
        },{
          text: 'Open File Manager',
          icon: !this.platform.is('ios') ? 'ios-folder' : null,
          handler: () => {
            this.storeFromFile();
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
  
  storeFromCamera() {
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      
      this.storeData('data:image/jpeg;base64,' + imageData);
      
     }, (err) => {
      // Handle error
        console.log(err);
     });
  }
  
  storeFromFile() {
    this.camera.getPicture(this.openFileOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      
      this.storeData('data:image/jpeg;base64,' + imageData);
      
     }, (err) => {
      // Handle error
        console.log(err);
     });
  }
  
  storeData(imageData: string) {
    this.loading = this.helpersProvider.loadingPresent("");
      
    let params = {
      "photo_base64": imageData
    }

    this.apiProvider.post("content-detail-lists/store/" + this.contentDetail.id, params, {"Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("token")})
      .then((data) => {

        let result = JSON.parse(data.data);
        console.log(result);
        this.loading.dismiss();

        this.details = result.data.content_detail_list;

        this.helpersProvider.toastPresent(result.message);

      })
      .catch((error) => {
        let result = JSON.parse(error.data);
        this.details = [];
        this.loading.dismiss();
        if (result.status == '401') {
          this.events.publish("auth:forceLogout", result.message);
        }

        this.helpersProvider.toastPresent(result.message);
      });
    
    
  }
  
  pressToDetail(item) {
    
    let alert = this.alertCtrl.create({
      title: 'Anda yakin ingin menghapus Foto ini?',
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
            this.deletePhoto(item.id);
          }
        }
      ]
    });
    alert.present();
          
  }
  
  deletePhoto(id) {
    this.apiProvider.delete("content-detail-lists/delete/" + id, {}, {"Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("token")})
        .then((data) => {
          
          let result = JSON.parse(data.data);
          console.log(result);
          this.loading.dismiss();
          
          this.details = result.data.content_detail_list;
          
          this.helpersProvider.toastPresent(result.message);
          
        })
        .catch((error) => {
          let result = JSON.parse(error.data);
          this.details = [];
          this.loading.dismiss();
          if (result.status == '401') {
            this.events.publish("auth:forceLogout", result.message);
          }
          
          this.helpersProvider.toastPresent(result.message);
        });
      
  }
  
  pictureDialog(data) {
    let url = data.value != null ? this.fileUrl + data.value : this.defaultFileUrl;
    this.helpersProvider.photoViewer.show(url);
  }
  
  doRefresh(e) {
    this.getData();
    setTimeout(() => {
      console.log('Async operation has ended');
      e.complete();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContentDetailListPage');
  }

}
