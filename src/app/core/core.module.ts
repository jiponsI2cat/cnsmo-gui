import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { AuthService } from 'app/core/auth.service';
import { HttpClientService } from 'app/core/http-client.service';
import { AuthGuard } from 'app/shared';

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule
  ],
  exports: [NotificationComponent],
  providers: [AuthService, HttpClientService, AuthGuard]
})

export class CoreModule { }
