import { RouterModule } from '@angular/router';
import { StatComponent } from './stat.component';
import { PageHeaderComponent } from './page-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from 'app/shared/form-input.component';
import { FormButtonComponent } from './form-button.component';
import { TextCodeComponent } from './text-code.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    FormInputComponent,
    FormButtonComponent,
    PageHeaderComponent,
    StatComponent,
    TextCodeComponent
  ],
  exports: [
    FormInputComponent,
    FormButtonComponent,
    PageHeaderComponent,
    StatComponent,
    TextCodeComponent
  ]
})

export class SharedModule { }
