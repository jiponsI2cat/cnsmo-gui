import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response, RequestMethod, BrowserXhr } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class HttpClientService {
  public tokenExpired: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private http: Http,
    private router: Router,
    private xhr: BrowserXhr
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

    if (data.url === authUrl) {
      /* headers.append('Content-Type', 'application/x-www-form-urlencoded');
      delete data.body; */
    } else {
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
      // when there's no content api returns empty string instead of JSON
      if ((response as any)._body === '') {
        return null;
      } else {
        const obj = response.json();
        return obj;
      }
    }).catch((error: any) => {
      return this.checkError(error);
    }).share();
  }

  /**
   * This function help the request function to detect
   * the error and to fire a notification service
   * to provide a feedback to user through an UI artefact
   * (notification, message, etc.)
  */
  checkError(error) {
    if (error.status === 401) {
      // if token is expired
      if (typeof error.json().msg === 'string' && error.json().msg === 'Invalid token!') {
        /*this.notification.error('You session has expired, please login.');*/
        localStorage.removeItem('currentEnterprise');
        localStorage.removeItem('currentUser');
        this.tokenExpired.emit(true);
        this.router.navigate(['/login']);
      }
    }
    if (error.status === 0) {
      const serverDown = 'Web Server';
      /*this.notification.error(`The ${serverDown} may be down, too busy,
                               or experiencing other problems preventing
                               it from responding to requests.`, 'Ok');*/
    }
    const errorMsg = error.message || 'Server error';
    if (error.status >= 400) {
      tryCatchErrors(error, error);
    }
    return Observable.throw(error);

    function tryCatchErrors(err, errMsg) {
      try {
        if (typeof error.json().msg === 'string' && error.json().msg !== 'Invalid token!') {
          /*this.notification.error(error.json().msg);*/
        } else {
          /*this.notification.error(`Error: ` + error.status);*/
        }
      } catch (error) {
        return Observable.throw(errMsg);
      }
    }
  }


}
