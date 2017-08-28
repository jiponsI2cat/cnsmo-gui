import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Notification } from './notification';

@Injectable()
export class NotificationService {
  public notifications: Subject<Notification> = new Subject<Notification>();
  public noteAdded = this.notifications.asObservable();

  constructor() { }

  public push(type: string, message: string, time?: number) {
    this.notifications.next(new Notification(type, message, time));
  }

}
