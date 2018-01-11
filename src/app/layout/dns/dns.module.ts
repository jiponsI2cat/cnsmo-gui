import {SharedModule} from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordsListComponent } from './records-list/records-list.component';
import { DnsRoutingModule } from './dns-routing.module';
import { DnsComponent } from './dns.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DnsRoutingModule
  ],
  declarations: [RecordsListComponent, DnsComponent]
})
export class DnsModule { }
