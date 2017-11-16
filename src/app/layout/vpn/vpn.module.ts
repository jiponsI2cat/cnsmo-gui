import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VpnComponent } from 'app/layout/vpn/vpn.component';
import { VpnRoutingModule } from 'app/layout/vpn/vpn-routing.module';
import { CertsComponent } from './certs/certs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VpnService } from 'app/layout/vpn/shared/vpn.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    VpnRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  declarations: [VpnComponent, CertsComponent],
  providers: [VpnService]
})
export class VpnModule { }
