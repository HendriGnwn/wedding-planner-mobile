import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the StaticPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-static',
  templateUrl: 'static.html',
})
export class StaticPage {
  
  loading: any;
  headerTitle: any = "Halaman Statis";
  content: any = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiProvider,
    public helpersProvider: HelpersProvider
  ) {
    this.headerTitle = this.navParams.get('header');
    this.getStatic();
  }
  
  getStatic() {
    this.loading = this.helpersProvider.loadingPresent("");
    this.api.get('page/' + this.navParams.get('id'), {}, {'Content-Type': 'application/json'})
      .then((data) => {
        this.loading.dismiss();
        let result = JSON.parse(data.data);
        console.log(data.data);
        this.content = result.data;
        this.headerTitle = this.content.name;

      })
      .catch((error) => {
        this.loading.dismiss();
        let result = JSON.parse(error.error);
        this.helpersProvider.toastPresent(result.message);
        this.content = {};
        console.log(error);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaticPage');
  }

}
