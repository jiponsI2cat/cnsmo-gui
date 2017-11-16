import { Injectable } from '@angular/core';
import { NotificationService } from 'app/core/notification/notification.service';
import { Router } from '@angular/router';
import { HttpClientService } from 'app/core/http-client.service';
import { Subject, Observable } from 'rxjs/Rx';
import { Certs } from 'app/layout/vpn/shared/certs';
import { environment } from '../../../../environments/environment';


@Injectable()
export class VpnService {

  /******** Client Nodes: Source, Observable and List ***************/
  private certsUpdatedSource = new Subject<Certs>();              /**/
  certsUpdated$ = this.certsUpdatedSource.asObservable();         /**/
  certs: Certs;                                                   /**/
  /******************************************************************/

  constructor(
    private http: HttpClientService,
    private router: Router,
    private notification: NotificationService
  ) { }

  generateCerts(clientName: string, callback?) {
    const response = this.http.post(`/certs/clients/${clientName}`).finally(() => {
      if (callback) {
        callback.apply();
      }
    });
    response.subscribe((data) => {
      Observable.forkJoin(
        this.http.get(`/certs/clients/${clientName}/key`),
        this.http.get(`/certs/clients/${clientName}/config`),
        this.http.get(`/certs/clients/${clientName}/cert`),
        this.http.get(`/certs/clients/${clientName}/ca`)
      ).subscribe(dataCerts => {
        const certs = new Certs({
          key: dataCerts[0].data,
          config: dataCerts[1].data,
          cert: dataCerts[2].data,
          ca: dataCerts[3].data
        });
        console.log(certs);
        this.updateCerts(certs);
      });
    }, (error: any) => {
      console.error(error);
      this.notification.push('error', error);
      // this.notification.error('Cannot Login!');
    });
  }

  public updateCerts(certs) {
    this.certsUpdatedSource.next(certs);
  }

}
