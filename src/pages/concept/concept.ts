import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from '../../providers/api/api';
import { ContentPage } from '../content/content';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {
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
        console.log(this.concepts);
        console.log(error);
      });
  }
  
  goToDetail(id: any, name: string) {
    this.navCtrl.push(ContentPage, {
      "id": id,
      "name": name
    });
  }

}
