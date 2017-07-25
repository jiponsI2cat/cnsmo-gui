import { AppRoutingModule } from './app-routing.module';
import { LayoutsModule } from './layouts/layouts.module';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientService } from 'app/core/http-client.service';
import { AuthService } from 'app/core/auth.service';
import { NotificationService } from 'app/core/notification/notification.service';
import { AuthGuard } from 'app/core/auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    LayoutsModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [HttpClientService, AuthService, NotificationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
/*    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
*/  }
}
