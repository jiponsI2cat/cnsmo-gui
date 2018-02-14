import { Component, OnInit, Input } from '@angular/core';
import { DnsService } from 'app/layout/dns/shared/dns.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-dns-tab',
  templateUrl: './dns-tab.component.html',
  styleUrls: ['./dns-tab.component.scss'],
  providers: [DnsService]
})
export class DnsTabComponent implements OnInit {

  @Input() publicIp;
  @Input() privateIp;
  @Input() defaultHostname;
  private publicIpDnsForm: FormGroup;
  private privateIpDnsForm: FormGroup;
  private loadingPublic: boolean;
  private loadingPrivate: boolean;
  private subscriptionPublicForm: Subscription;
  private subscriptionPrivateForm: Subscription;

  constructor(private dns: DnsService, private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.initPrivateForm();
    this.initPublicForm();
  }

  initPrivateForm() {
    this.privateIpDnsForm = this.formBuilder.group({
      ip: { value: this.privateIp, disabled: true },
      hostname: [this.defaultHostname || '', Validators.required],
    });
  }

  initPublicForm() {
    this.publicIpDnsForm = this.formBuilder.group({
      ip: { value: this.publicIp, disabled: true },
      hostname: [this.defaultHostname || '', Validators.required],
    });
  }

  onSubmitPublic() {
    this.loadingPublic = true;
    const client = `${this.publicIp} ${this.publicIpDnsForm.value.hostname}`;
    this.subscriptionPublicForm = this.dns.addDnsRecord(client).subscribe(() => {
      this.loadingPublic = false;
      this.subscriptionPublicForm.unsubscribe();
      this.initPublicForm();
    });
  }

  onSubmitPrivate() {
    this.loadingPrivate = true;
    const client = `${this.privateIp} ${this.privateIpDnsForm.value.hostname}`;
    this.subscriptionPrivateForm = this.dns.addDnsRecord(client).subscribe(() => {
      this.loadingPrivate = false;
      this.subscriptionPrivateForm.unsubscribe();
      this.initPrivateForm();
    });
  }

}
