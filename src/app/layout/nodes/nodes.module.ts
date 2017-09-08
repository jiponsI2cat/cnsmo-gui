import { NodesService } from './shared/nodes.service';
import { SharedModule } from '../../shared/shared.module';
import { NodesComponent } from './nodes.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NodesRoutingModule } from 'app/layout/nodes/nodes-routing.module';
import { NodesListComponent } from 'app/layout/nodes/nodes-list/nodes-list.component';
import { NodesFlowsComponent } from './nodes-flows/nodes-flows.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NodesRoutingModule,
    SharedModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  declarations: [
    NodesComponent,
    NodesListComponent,
    NodesFlowsComponent
  ],
  providers: [NodesService]
})
export class NodesModule { }
