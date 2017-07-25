import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingPageComponent } from './application-layout/landing-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutsRoutingModule } from 'app/layouts/layouts-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'app/core/core.module';
import { ApplicationLayoutComponent } from 'app/layouts/application-layout/application-layout.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    RouterModule,
    LayoutsRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    ApplicationLayoutComponent,
    LandingPageComponent
  ],
  entryComponents: []

})

export class LayoutsModule { }
