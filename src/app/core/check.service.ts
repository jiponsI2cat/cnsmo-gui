import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NotificationService } from './notification/notification.service';

@Injectable()
export class CheckService {
  public tokenExpired: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private notification: NotificationService,
    private router: Router,
  ) { }
  checkError(error) {
    if (error.status === 401) {
      // if token is expired
      if (typeof error.json().msg === 'string' && error.json().msg === 'Invalid token!') {
        this.notification.push('', '', 0);
        this.notification.push('error', 'You session has expired, please login.', 5000000000);
        localStorage.removeItem('currentEnterprise');
        localStorage.removeItem('currentUser');
        this.tokenExpired.emit(true);
        this.router.navigate(['/login']);
      }
    }
    if (error.status === 0) {
      const serverDown = 'Web Server';
      this.notification.push('', '', 0); // to clean all old this.notifications
      this.notification.push('error', `The server may be down, too busy,
                                       or experiencing other problems preventing
                                       it from responding to requests.`);
    }
    const errorMsg = error.message || 'Server error';
    if (error.status >= 400) {
      tryCatchErrors(error, error, this.notification);
    }
    return Observable.throw(error);

    function tryCatchErrors(err, errMsg, notification) {
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
