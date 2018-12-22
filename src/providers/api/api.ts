import { HttpClient, HttpParams } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { config } from '../../providers/Config';
import { Heplers } from '../../providers/Helper/Helpers';
import { AppSettings } from '../../app/config/globals';
/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  // url: string = 'http://localhost:24741/api/values/';
  url: string;

  data: any;
  playlist: any;
  newsitems: any;

  constructor(public http: HttpClient, public httpclient: Http, public helper: Heplers, public config: config, public storage: Storage) {

    // this.storage.get(this.config.MainURL_Key).then(res => this.url = res)
    //   .catch(err => helper.showMessage(err, "Error"));

    this.url = AppSettings.API_ENDPOINT;

    debugger;


    //this.storage.get(this.config.MainURL_Key).then(res => this.url = res)

  }

  callGetWithoutMainURL(endpoint: string, body: string, params?: any, reqOpts?: any) {
    debugger;
    let headers = new Headers();
    return this.http.post(endpoint, body)

  }

  callGet(endpoint: string, body: string, params?: any, reqOpts?: any) {
    this.url = AppSettings.API_ENDPOINT;
debugger;
    let headers = new Headers();
    return this.http.post(this.url + '/' + endpoint, body)

  }


  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }
    debugger;
    //this.url + '/' +
    return this.http.get(endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    debugger;
    //this.url + '/' + 
    return this.http.post(endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }
}
