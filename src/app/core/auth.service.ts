import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
/*import { NotificationService } from './notification.service';
*/import { HttpClientService } from './http-client.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  public currentUser = null;

  constructor(
    private http: HttpClientService,
/*    private notification: NotificationService,
*/    private router: Router) {

    http.tokenExpired.subscribe((event) => {
      if (event) {
        this.currentUser = null;
      }
    });

    const userData = JSON.parse(localStorage.getItem('currentUser'));
    if (!userData) { return; }
    this.currentUser = userData;

  }

  public login(userData: any, callBack?: any) {
    const response = this.http.post(environment.authUrl, userData).finally(() => {
      if (callBack) {
        callBack.apply();
      }
    });
    response.subscribe((data: any) => {
/*      this.notification.message('Welcome Back to Symphony!', 'Close', 3000);
*/      localStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUser = data;
    }, (error: any) => {
/*      this.notification.error('Cannot Login!');
*/    });
    return response;
  }

  public logout() {
    this.currentUser = null;
/*    this.notification.message('You have been signed out successfully!', 'Close');
*/    this.router.navigate(['/login']);
/*    this.webSocketService.disconnect();
*/    return localStorage.removeItem('currentUser');
  }

  public register() {

  }

  public logoutUser() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentEnterprise');
    this.router.navigate(['/login']);
    /*    this.webSocketService.disconnect();*/
    return false;
  }

  public overwriteOwnDatasetLS(ownDataset) {
    const json_object = JSON.parse(localStorage['currentUser']); // convert string to object
    json_object['user']['ownDataset'] = ownDataset; // add value
    localStorage['currentUser'] = JSON.stringify(json_object);  // store it again.
  }

}
