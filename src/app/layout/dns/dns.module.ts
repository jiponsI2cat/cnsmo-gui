import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordsListComponent } from './records-list/records-list.component';
import { DnsRoutingModule } from './dns-routing.module';
import { DnsComponent } from './dns.component';
import { DnsService } from './shared/dns.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DnsRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RecordsListComponent, DnsComponent],
  providers: [DnsService]
})
export class DnsModule { }
