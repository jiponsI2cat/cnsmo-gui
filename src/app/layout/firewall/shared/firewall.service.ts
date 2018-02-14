import { Rule } from './rule';
import { Router } from '@angular/router';
import { HttpClientService } from 'app/core/http-client.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class FirewallService {

  /******* Firewall Rules: Source, Observable and List ********/
  private rulesUpdatedSource = new Subject<Rule[]>();       /**/
  rulesUpdated$ = this.rulesUpdatedSource.asObservable();   /**/
  rules: Rule[];                                            /**/
  /************************************************************/

  constructor(
    private http: HttpClientService,
    private router: Router
  ) { }

  /**
   * This method do a request for the list of rules and update the status
   * of rules source in order to ensure that subscribers will fire
   * subscribe event and update their list of fw rules
   * @param callback
   */
  public getRules(callback?) {
    // TODO: hacer el get de las rules ya iniciadas en el server y llamar el
    // metodo updateRules
    const response = this.http.get('/services/fw/rules').finally(() => {
      if (callback) {
        callback.apply();
      }
    });
    response.subscribe((data: any) => {

      this.rules = data;
      this.updateRules(data);
    }, (error: any) => {
      console.log(error);
      // this.notification.error('Cannot Login!');
    });
  }

  /**
   * This add a new rule to fw and notify the result
   * @param rule {object} An object with fw rules parameters
   * @param callback
   */
  public addRule(rule: object, callback?) {
    const response = this.http.post('/services/fw/rules', rule).finally(() => {
      if (callback) {
        callback.apply();
      }
    });
    response.subscribe((data: any) => {
      this.rules.push(new Rule(rule));
      this.updateRules(this.rules);
    }, (error: any) => {
      console.log(error);
      // this.notification.error('Cannot Login!');
    });
    return response;
  }

  public updateRules(rules) {
    // crear servicio con sistema de loading y loader component
    this.rulesUpdatedSource.next(rules);
  }
}
