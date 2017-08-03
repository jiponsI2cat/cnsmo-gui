import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from 'app/shared/form-input.component';
import { FormButtonComponent } from './form-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FormInputComponent,
    FormButtonComponent
  ],
  exports: [
    FormInputComponent,
    FormButtonComponent
  ]
})

export class SharedModule { }
