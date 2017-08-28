import { NodesService } from './shared/nodes.service';
import { SharedModule } from '../../shared/shared.module';
import { NodesComponent } from './nodes.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodesRoutingModule } from 'app/layout/nodes/nodes-routing.module';
import { NodesListComponent } from 'app/layout/nodes/nodes-list/nodes-list.component';

@NgModule({
  imports: [
    CommonModule,
    NodesRoutingModule,
    SharedModule
  ],
  declarations: [
    NodesComponent,
    NodesListComponent
  ],
  providers: [NodesService]
})
export class NodesModule { }
