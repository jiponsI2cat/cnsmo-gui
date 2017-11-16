import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VpnComponent } from 'app/layout/vpn/vpn.component';
import { VpnRoutingModule } from 'app/layout/vpn/vpn-routing.module';
import { CertsComponent } from './certs/certs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    VpnRoutingModule,
    SharedModule,
    NgbModule.forRoot()
  ],
  declarations: [VpnComponent, CertsComponent]
})
export class VpnModule { }
