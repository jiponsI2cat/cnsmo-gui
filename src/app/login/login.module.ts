import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule {
}
