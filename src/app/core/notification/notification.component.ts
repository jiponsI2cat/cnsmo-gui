import { Component } from '@angular/core';

import { NotificationService } from './notification.service';
import { Notification } from './notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  public notifications: Notification[];

  constructor(private notificationService: NotificationService) {
    this.notifications = new Array<Notification>();

    notificationService.noteAdded.subscribe(note => {
      /*
       * if time of a note is setted to 0 it clean
       * all existing notifications and returns.
       * It can be usefull just after a login for example.
       */
      if (note.time === 0) {
        this.notifications = [];
        return false;
      }

      /*
      * If already exist a note with duration greater than 5000
      * and entering note duration is greater than 5000 too
      * it returns.
      */
      if ( (this.notifications.find((existingNote) => {
        return existingNote.time > 5000;
      })) && note.time > 5000) {
        return false;
      }

      this.notifications.unshift(note);
      setTimeout(() => { this.hide.bind(this)(note); }, note.time ? note.time : 5000
      );
    });
  }

  private hide(note) {
    let index = this.notifications.indexOf(note);
    if (index >= 0) {
      this.notifications.splice(index, 1);
    }
  }

}
