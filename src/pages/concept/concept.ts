import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import {ApiProvider} from '../../providers/api/api';
import { ContentPage } from '../content/content';
import { LoginPage } from '../login/login';
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
  
  concepts: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider, public helpersProvider: HelpersProvider, public app: App) {
    if (localStorage.getItem("isLoggedIn") == null) {
      this.helpersProvider.toastPresent("Session expired, Please Login again.", );
      this.helpersProvider.clearLoggedIn();
      this.app.getRootNav().setRoot(LoginPage);
    }
    this.getConcepts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConceptPage');
  }
  
  getConcepts() {
    this.api.get('concepts', {}, {'Content-Type':'application/json'})
      .then((data) => {

        this.concepts = JSON.parse(data.data).data;
        console.log(this.concepts);
        console.log(data.data);

      })
      .catch((error) => {
        this.concepts = [];
        let result = JSON.parse(error.error);
        if (result.status == '401') {
          this.helpersProvider.toastPresent(result.message);
          this.helpersProvider.clearLoggedIn();
          this.app.getRootNav().setRoot(LoginPage);
        }
        
      });
  }
  
  goToDetail(id: any, name: string) {
    this.navCtrl.push(ContentPage, {
      "id": id,
      "name": name
    });
  }

}
