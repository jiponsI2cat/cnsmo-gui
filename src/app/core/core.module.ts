import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { AuthService } from 'app/core/auth.service';
import { HttpClientService } from 'app/core/http-client.service';

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule
  ],
  providers: [AuthService, HttpClientService]
})

export class CoreModule { }
