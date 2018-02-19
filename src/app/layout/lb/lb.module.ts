import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LbComponent } from './lb.component';
import { LbRoutingModule } from './lb-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NodesModule } from '../nodes/nodes.module';

@NgModule({
  imports: [
    CommonModule,
    LbRoutingModule,
    SharedModule,
    NodesModule
  ],
  declarations: [LbComponent]
})
export class LbModule { }
