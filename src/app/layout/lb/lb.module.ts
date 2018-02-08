import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LbComponent } from './lb.component';
import { LbRoutingModule } from './lb-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LbRoutingModule,
  ],
  declarations: [LbComponent]
})
export class LbModule { }
