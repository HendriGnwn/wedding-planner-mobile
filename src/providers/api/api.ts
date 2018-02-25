import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  
  API_URL : string = 'http://192.168.43.233:8080/wedding-planner-web/public/api/v1/';

  constructor(private http: HTTP) {
    console.log('Hello ApiProvider Provider');
  }
  
  get(url: string, params?: any, headers?: any) {
    this.http.setDataSerializer('json');
    return this.http.get(this.API_URL + url, params, headers);
  }
  
  post(url: string, params?: any, headers?: any) {
    this.http.setDataSerializer('json');
    return this.http.post(this.API_URL + url, params, headers);
  }

}
