import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from 'app/shared/form-input.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FormInputComponent
  ],
  exports: [
    FormInputComponent
  ]
})

export class SharedModule { }
