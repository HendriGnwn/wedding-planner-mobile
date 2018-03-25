import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from '../../providers/api/api';
import {HelpersProvider} from '../../providers/helpers/helpers';

/**
 * Generated class for the ProcedurePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-procedure',
  templateUrl: 'procedure.html',
})
export class ProcedurePage {
  
  procedureImgUrl : string = "http://agendanikah.com/dev/public/files/procedures/default.png";

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider, public helpersProvider: HelpersProvider) {
    this.getProcedure();
  }
  
  getProcedure() {
    this.apiProvider.get('procedure', {}, {'Content-Type':'application/json'})
        .then((data) => {
          
          let result = JSON.parse(data.data);
          
          this.procedureImgUrl = result.link + '/' + result.data.file;
        })
        .catch((error) => {
          let result = JSON.parse(error.error);
          this.helpersProvider.toastPresent(result.message);
          console.log(error);
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProcedurePage');
  }

}
