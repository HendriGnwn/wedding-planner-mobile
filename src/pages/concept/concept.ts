import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
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
  
  concepts: any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public api: ApiProvider, 
    public helpersProvider: HelpersProvider, 
    public events: Events
  ) {
  
    this.events.publish("auth:checkLogin");
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
          this.events.publish("auth:forceLogout", result.message);
        }
      });
  }
  
  goToDetail(id: any, name: string) {
    this.navCtrl.push("ContentPage", {
      "id": id,
      "name": name
    });
  }
  
  goToNotification() {
    this.navCtrl.push("NotificationPage");
  }

}
