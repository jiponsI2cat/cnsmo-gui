import { RouterModule } from '@angular/router';
import { StatComponent } from './stat.component';
import { PageHeaderComponent } from './page-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from 'app/shared/form-input.component';
import { FormButtonComponent } from './form-button.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    FormInputComponent,
    FormButtonComponent,
    PageHeaderComponent,
    StatComponent
  ],
  exports: [
    FormInputComponent,
    FormButtonComponent,
    PageHeaderComponent,
    StatComponent
  ]
})

export class SharedModule { }
