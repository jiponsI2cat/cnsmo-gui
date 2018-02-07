import { NodesService } from './shared/nodes.service';
import { SharedModule } from '../../shared/shared.module';
import { NodesComponent } from './nodes.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NodesRoutingModule } from 'app/layout/nodes/nodes-routing.module';
import { NodesListComponent } from 'app/layout/nodes/nodes-list/nodes-list.component';
import { NodesFlowsComponent } from './nodes-flows/nodes-flows.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { DnsTabComponent } from './dns-tab/dns-tab.component';
export declare let require: any;

export function highchartsFactory() {
  const hc = require('highcharts');
  const dd = require('highcharts/modules/drilldown');
  dd(hc);

  return hc;
}

@NgModule({
  imports: [
    CommonModule,
    NodesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    NgbModule.forRoot(),
    ChartModule
  ],
  declarations: [
    NodesComponent,
    NodesListComponent,
    NodesFlowsComponent,
    DnsTabComponent
  ],
  providers: [
    NodesService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }],
})
export class NodesModule { }
