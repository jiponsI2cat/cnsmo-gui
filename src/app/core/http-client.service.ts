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
    const options = data.options || {};
    const headers = new Headers();
    if (options && options.image) {
      headers.append('Content-Type', 'image/gif');
    } else {
      headers.append('Content-Type', 'application/json');
    }

    if (data.url === '/user/login') {
      headers.append('Authorization', 'Basic ' + btoa(data.body.username + ':' + data.body.password));
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      delete data.body;
    } else {
      const userData = JSON.parse(localStorage.getItem('currentUser'));
      if (!userData) {
        this.router.navigate(['/login']);
      } else {
        headers.append('Authorization', userData.token);
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
        let obj: any;
        if (options && options.image) {
          // obj = window.btoa((response as any)._body);

        } else {
          obj = response.json();
        }
        return obj;
      }
    }).catch((error: any) => {
      const errMsg = error.message || 'Server error';
      if (error.status >= 400) {
        this.tryCatchErrors(error, errMsg);
      }
      this.checkToken(error);
      if (error.status === 0) {
        const serverDown = 'Web Server';
        /*this.notification.error(`The ${serverDown} may be down, too busy,
                                 or experiencing other problems preventing
                                 it from responding to requests.`, 'Ok');*/
      }
      return Observable.throw(errMsg);
    }).share();
  }

  checkToken(error) {
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
  }

  tryCatchErrors(error, errMsg) {
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

  getImage(url: string) {
    function arrayBufferToBase64(buffer) {
      let binary = '';
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;

      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    }
    return Observable.create(observer => {
      const req = new XMLHttpRequest();
      const api = environment.api;
      const userData = JSON.parse(localStorage.getItem('currentUser'));
      if (!userData) {
        this.router.navigate(['/login']);
        return false;
      }

      req.open('get', api + url);
      req.responseType = 'arraybuffer';
      req.setRequestHeader('Authorization', userData.token);

      req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
          const res = arrayBufferToBase64(req.response);
          observer.next(res);
          observer.complete();
        }
      };
      req.send();
    });
  }

  uploadFile(url: string, file: File[], form: any, formData: FormData) {

    return Observable.create(observer => {
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      const api = environment.api;
      const userData = JSON.parse(localStorage.getItem('currentUser'));
      if (!userData) {
        this.router.navigate(['/login']);
        return false;
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
            // resolve(<any>JSON.parse(xhr.response));
          } else {
            observer.error(JSON.parse(xhr.response));
            observer.complete();

            // reject(xhr.response);
          }
        }
      };

      xhr.open('post', api + url, true);
      xhr.setRequestHeader('Authorization', userData.token);
      xhr.send(formData);

    });
  }

  

}

/*@app.route('/dataset/profile/img/upload', methods=['POST'])
def uploadprofiledataset():
    if request.environ['HTTP_AUTHORIZATION'] == 'valid':
        dataset = request.form['dataset']
        user = request.form['user']
        file = request.files['file']
        file.filename = 'profile.'+file.filename.rsplit('.', 1)[1]
        if file and allowed_file(file.filename):
            filename=secure_filename(file.filename) 
            directory = os.path.join(app.config['USERS_FOLDER'],user,'DATASETS',dataset,'PROFILE')  
            if not os.path.exists(directory):
                os.makedirs(directory)  
           filePath = os.path.join(directory,filename) 
           err = file.save(filePath) 
           if err != None:
                return '{"error": "Error uploading file"}' 
           return "Success"
    return 'Fail',401 #No authorization
*/