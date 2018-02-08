import { Injectable } from '@angular/core';
import { HttpClientService } from 'app/core/http-client.service';
import { Router } from '@angular/router';
import { NotificationService } from 'app/core/notification/notification.service';
import { Subject } from 'rxjs/Rx';

import { DnsRecord } from './dnsRecord';
import { Helpers } from 'app/shared/helpers';

@Injectable()
export class DnsService {

  private dnsRecordsUpdatedSource = new Subject<DnsRecord[]>();
  dnsRecordsUpdated$ = this.dnsRecordsUpdatedSource.asObservable();
  dnsRecords: DnsRecord[];
  public updateDnsRecords(dnsRecords) {
    // crear servicio con sistema de loading y loader component
    this.dnsRecordsUpdatedSource.next(dnsRecords);
  }

  constructor(
    private http: HttpClientService,
    private router: Router,
    private notification: NotificationService
  ) { }

  public getDNSRecords(callback?) {
    if (this.dnsRecords) { this.updateDnsRecords(this.dnsRecords); }
    const response = this.http.get('/services/dns/records').finally(() => {
      if (callback) {
        callback.apply();
      }
    });
    response.subscribe((data: any) => {
      if (!Helpers.objectsAreEquals(data, this.dnsRecords)) {
        this.dnsRecords = data.dns_records.map(record => new DnsRecord(record));
        this.updateDnsRecords(this.dnsRecords);
        // this.notification.push('info', `Nodes are updated`, 2000);
      }
    }, (error: any) => {
      console.error(error);
      this.notification.push('error', error);
    });
  }

  public addDnsRecord(dnsRecord, callback?) {
    const response = this.http.post(`/services/dns/record`, { dnsrecords: dnsRecord }).finally(() => {
      if (callback) {
        callback.apply();
      }
    });
    response.subscribe((data) => {
      const entry = new DnsRecord(dnsRecord)
      if (this.dnsRecords) {
        this.dnsRecords.push(entry);
        this.updateDnsRecords(this.dnsRecords);
      }
      this.notification.push('info', `${dnsRecord} is added to DNS records`, 2000);
    }, (error: any) => {
      console.error(error);
      this.notification.push('error', error);
    });
    return response;
  }

}
