import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response, RequestMethod, BrowserXhr } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { NotificationService } from './notification/notification.service';

@Injectable()
export class HttpClientService {

  public tokenExpired: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private http: Http,
    private router: Router,
    private xhr: BrowserXhr,
    private notification: NotificationService,
  ) { }

  get(url: string, data?: any) {
    return this.request({
      url: url,
      method: RequestMethod.Get,
      body: data
    });
  }

  post(url: string, data?: any) {
    return this.request({
      url: url,
      method: RequestMethod.Post,
      body: data
    });
  }

  put(url: string, data?: any) {
    return this.request({
      url: url,
      method: RequestMethod.Put,
      body: data
    });
  }

  delete(url: string, data?: any) {
    return this.request({
      url: url,
      method: RequestMethod.Delete,
      body: data
    });
  }

  request(data: any) {
    const api = environment.api;
    const authUrl = environment.authUrl;
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
      const obj = response.json();
      return obj;
    }).catch((error: any) => {
      return this.checkError(error, this.notification);
    }).share();
  }

  checkError(error, notification) {
    if (error.status === 401) {
      // if token is expired
      if (typeof error.json().errors === 'string' && error.json().errors === 'Invalid Token') {
        notification.push('', '', 0);
        notification.push('error', 'You session has expired, please login.', 5000000000);
        localStorage.removeItem('currentEnterprise');
        localStorage.removeItem('currentUser');
        this.tokenExpired.emit(true);
        this.router.navigate(['/login']);
      }
    }
    if (error.status === 0) {
      const serverDown = 'Web Server';
      notification.push('', '', 0); // to clean all old notifications
      notification.push('error', `The server may be down, too busy,
                                       or experiencing other problems preventing
                                       it from responding to requests.`);
    }
    const errorMsg = error.message || 'Server error';
    if (error.status >= 400) {
      tryCatchErrors(error, error);
    }
    return Observable.throw(error);

    function tryCatchErrors(err, errMsg: string) {
      try {
        if (typeof error.json().msg === 'string' && error.json().msg !== 'Invalid token!') {
          notification.push('error', error.json().errors);
        } else {
          const apiMessage = error.json().message;
          notification.push('error', `${apiMessage}`);
        }
      } catch (error) {
        return Observable.throw(errMsg);
      }
    }
  }

}
