import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response, RequestMethod, BrowserXhr } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { NotificationService } from './notification/notification.service';
import { CheckService } from './check.service';

@Injectable()
export class HttpClientService {

  public tokenExpired: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private http: Http,
    private router: Router,
    private xhr: BrowserXhr,
    private checkService: CheckService,
  ) { }

  get(url: string, data?: any, options?: any) {
    return this.request({
      url: url,
      method: RequestMethod.Get,
      body: data,
      options: options,
    });
  }

  post(url: string, data?: any, options?: any) {
    return this.request({
      url: url,
      method: RequestMethod.Post,
      body: data,
      options: options
    });
  }

  put(url: string, data?: any, options?: any) {
    return this.request({
      url: url,
      method: RequestMethod.Put,
      body: data,
      options: options
    });
  }

  delete(url: string, data?: any, options?: any) {
    return this.request({
      url: url,
      method: RequestMethod.Delete,
      body: data,
      options: options
    });
  }

  request(data: any) {
    const api = environment.api;
    const authUrl = environment.authUrl;
    const options = data.options || {};
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (data.url !== authUrl) {
      const userData = JSON.parse(localStorage.getItem('currentUser'));
      if (!userData) {
        this.router.navigate(['/login']);
      } else {
        headers.append('Authorization', `Bearer ${userData.token}`);
      }
    }
    return this.http.request(api + data.url, {
      method: data.method,
      headers: headers,
      body: JSON.stringify(data.body)
    }).map((response: Response) => {
      return response.json();
    }).catch((error: any) => {
      return this.checkService.checkError(error);
    }).share();
  }

}
