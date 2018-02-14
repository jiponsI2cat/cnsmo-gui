import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LbComponent } from './lb.component';
import { LbRoutingModule } from './lb-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    LbRoutingModule,
    SharedModule
  ],
  declarations: [LbComponent]
})
export class LbModule { }
