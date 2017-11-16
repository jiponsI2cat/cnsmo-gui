import { Component, OnInit, OnDestroy } from '@angular/core';
import { VpnService } from 'app/layout/vpn/shared/vpn.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-certs',
  templateUrl: './certs.component.html',
  styleUrls: ['./certs.component.scss']
})
export class CertsComponent implements OnInit, OnDestroy {

  private ca;
  private cert;
  private config;
  private key;

  certsSubscription: Subscription;

  private generateForm: FormGroup;

  constructor(
    private vpn: VpnService,
    private formBuilder: FormBuilder, ) { }

  ngOnInit() {
    this.certsSubscription = this.vpn.certsUpdated$.subscribe((certs) => {
      this.key = certs.key;
      this.ca = certs.ca;
      this.config = certs.config;
      this.cert = certs.cert;
    })

    this.generateForm = this.formBuilder.group({
      clientName: ''
    })
  }

  ngOnDestroy() {
    this.certsSubscription.unsubscribe();
  }

  generate() {
    const clientName = this.generateForm.value.clientName
    this.vpn.generateCerts(clientName, () => {
      // remove string from input
    });
  }

}
