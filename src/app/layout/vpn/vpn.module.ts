import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VpnComponent } from 'app/layout/vpn/vpn.component';
import { VpnRoutingModule } from 'app/layout/vpn/vpn-routing.module';

@NgModule({
  imports: [
    CommonModule,
    VpnRoutingModule
  ],
  declarations: [VpnComponent]
})
export class VpnModule { }
