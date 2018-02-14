import { Component, OnInit } from '@angular/core';
import { DnsService } from 'app/layout/dns/shared/dns.service';
import { DnsRecord } from 'app/layout/dns/shared/dnsRecord';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Helpers } from 'app/shared/helpers';

@Component({
  selector: 'app-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.scss']
})
export class RecordsListComponent implements OnInit {
  dnsRecords: DnsRecord[];
  loading: boolean;
  private addDnsRecordForm: FormGroup;

  constructor(private dnsService: DnsService, private formBuilder: FormBuilder) {
    dnsService.dnsRecordsUpdated$.subscribe(dnsRecords => {
      this.dnsRecords = dnsRecords.filter((record) => {
        const entry = record.dnsRecord.split(' ')[0];
        const ipv6 = Helpers.ipv6RegEx;
        const isIpv6 = ipv6.test(entry);
        const validCharacters = (entry !== '\n' && entry !== '#');
        const validIpv4 = (entry !== '127.0.0.1' && entry !== '127.0.1.1');
        return !isIpv6 && validCharacters && validIpv4
      });
      this.loading = false;
    });
  }

  ngOnInit() {
    this.loading = true;
    this.dnsService.getDNSRecords();
    this.addDnsRecordForm = this.formBuilder.group({
      dnsRecord: [
        '', [
          Validators.required]
      ]
    })
  }

  addRecord() {
    this.loading = true;
    const dnsRecord = this.addDnsRecordForm.value.dnsRecord
    this.dnsService.addDnsRecord(dnsRecord);
  }

}
