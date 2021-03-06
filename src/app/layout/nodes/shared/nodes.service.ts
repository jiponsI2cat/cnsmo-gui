import { Node } from './node';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { NotificationService } from '../../../core/notification/notification.service';
import { HttpClientService } from 'app/core/http-client.service';
import { environment } from '../../../../environments/environment';
import { Helpers } from '../../../shared/helpers'

@Injectable()
export class NodesService {


  /******** Client Nodes: Source, Observable and List *****************/
  private numPacketsUpdatedSource = new Subject<any[]>();          /**/
  numPacketsUpdated$ = this.numPacketsUpdatedSource.asObservable(); /**/
  numPackets: any[] = [];                                               /**/
  /**/
  private numIncomingUpdatedSource = new Subject<Object>();          /**/
  numIncomingUpdated$ = this.numIncomingUpdatedSource.asObservable(); /**/
  numIncoming: Object;
  /**/
  private nodesUpdatedSource = new Subject<Node[]>();               /**/
  nodesUpdated$ = this.nodesUpdatedSource.asObservable();           /**/
  nodes: Node[];                                                    /**/
  /**/
  private nodeFlowsUpdatedSource = new Subject<number[]>();         /**/
  nodeFlowsUpdated$ = this.nodeFlowsUpdatedSource.asObservable();   /**/
  flows = { 'initValue': [] };                                      /**/
  /********************************************************************/

  constructor(
    private http: HttpClientService,
    private router: Router,
    private notification: NotificationService
  ) { }

  /**
   * This method do a request for the list of nodes and update the status
   * of nodes source in order to ensure that subscribers will fire
   * subscribe event and update their list of sdn nodes
   * @param callback
   */
  public getNodes(callback?) {
    if (this.nodes) { this.updateNodes(this.nodes); }
    const response = this.http.get('/services/sdn/nodes').finally(() => {
      if (callback) {
        callback.apply();
      }
    });
    response.subscribe((data: any) => {
      if (!Helpers.objectsAreEquals(data, this.nodes)) {
        this.nodes = data;
        this.updateNodes(data);
        // this.notification.push('info', `Nodes are updated`, 2000);
      }
    }, (error: any) => {
      console.error(error);
      this.notification.push('error', error);
    });
  }

  /*   public getNodesCount(callback?) {
      const s = new Subject<number>();
      const response = this.http.get('/services/sdn/nodes').finally(() => {
        if (callback) {
          callback.apply();
        }
      });
      response.subscribe((data: any) => {
        s.next(data.length);
      }, (error: any) => {
        this.notification.push('error', error);
      });
      return s.asObservable();
    } */

  public getStats(callback?) {
    const s = new Subject<[Number, Object]>();
    const response = this.http.get('/services/sdn/nodes').finally(() => {
      if (callback) {
        callback.apply();
      }
    });
    response.subscribe((data: any) => {
      const parsedServices = data[0].services.replace(/[\[\]\"\ ]/g, '').split(',');
      const services = [
        { name: 'sdn', active: false, label: 'Firewall' },
        { name: 'vpn', active: false, label: 'VPN' },
        { name: 'dns', active: false, label: 'DNS' },
        { name: 'lb', active: false, label: 'Load Balancer' }
      ];
      parsedServices.forEach(element => {
        services.find((service) => service.name === element).active = true;
      });
      s.next([data.length, services]);
      this.nodes = data;
      this.updateNodes(data);
    }, (error: any) => {
      this.notification.push('error', error);
    });
    return s.asObservable();
  }



  /**
   * This add a new node to sdn and notify the result
   * @param node {object} An object with sdn nodes parameters
   * @param callback
   */
  public addNode(node: object, callback?) {
    const response = this.http.post('/services/sdn/nodes', node).finally(() => {
      if (callback) {
        callback.apply();
      }
    });
    response.subscribe((data: any) => {
      this.nodes.push(new Node(node));
      this.updateNodes(this.nodes);
    }, (error: any) => {
      console.error(error);
      this.notification.push('error', error);
      // this.notification.error('Cannot Login!');
    });
    return response;
  }

  public getFlowsByNode(instanceId, callback?) {
    if (this.flows[instanceId]) { this.updateFlows(this.flows); }
    const response = this.http.get(`/services/sdn/nodes/${instanceId}/blockedTcpPorts`).finally(() => {
      if (callback) {
        callback.apply();
      }
    });
    response.subscribe((data: any) => {
      if (!Helpers.objectsAreEquals(data, this.flows[instanceId])) {
        this.flows[instanceId] = data;
        this.updateFlows(this.flows);
        // this.notification.push('info', `${instanceId}'s flows are updated`, 2000);
      }
    }, (error: any) => {
      this.flows[instanceId] = [-1];
      this.updateFlows(this.flows);
      console.error(error);
      this.notification.push('error', error);
      // this.notification.error('Cannot Login!');
    });
  }

  public blockPort(instanceId, destinationPort, destinationAddress, callback?) {
    const api = environment.api.split('/')[2].split(':')[0];
    const reqData = {
      'tcp-destination-port': destinationPort,
      'ip4-destination': destinationAddress || `${api}/16`,
      'ssinstanceid': instanceId
    }
    const response = this.http.put(`/services/sdn/blockByPort`, reqData).finally(() => {
      if (callback) {
        callback.apply();
      }
    });
    response.subscribe((data) => {
      const flow = { destinationPort: destinationPort, destinationAddress: destinationAddress, flowId: data.flowId }
      this.flows[instanceId].push(flow);
      this.updateFlows(this.flows);
    }, (error: any) => {
      console.error(error);
      this.notification.push('error', error);
      // this.notification.error('Cannot Login!');
    });
  }

  public deleteFlow(instanceId, flowId, callback?) {
    const tempFlows = this.flows[instanceId];
    this.flows[instanceId] = this.flows[instanceId].filter((flow) => {
      return flow.flowId !== flowId;
    });
    this.updateFlows(this.flows);
    const response = this.http.delete(`/services/sdn/nodes/${instanceId}/flows/${flowId}`).finally(() => {
      if (callback) {
        callback.apply();
      }
    });
    response.subscribe(() => {
    }, (error: any) => {
      this.flows[instanceId] = tempFlows;
      this.updateFlows(this.flows);
      console.error(error);
      this.notification.push('error', error);
      // this.notification.error('Cannot Login!');
    });
  }

  public getNumPackets(clientId: string, flowId: string, callback?) {
    const response = this.http.get(`/services/sdn/nodes/${clientId}/flows/${flowId}/monitoring`).finally(() => {
      if (callback) {
        callback.apply();
      }
    });
    response.subscribe((data: any) => {
      if (this.numPackets.length > 1) {
        this.numPackets.shift();
        this.numPackets.push({ num: data.numPackets, timeStamp: Date.now() });
        this.numPacketsUpdatedSource.next(this.numPackets);
      } else {
        this.numPackets.push(data.numPackets);
        this.numPacketsUpdatedSource.next(this.numPackets);
      }
    }, (error: any) => {
      console.error(error);
      this.notification.push('error', error);
    });
    return response;
  }

  public getNumIncoming(clientId: string, callback?) {
    const response = this.http.get(`/services/sdn/nodes/${clientId}/monitoring/incoming`).finally(() => {
      if (callback) {
        callback.apply();
      }
    });
    response.subscribe((data: any) => {
      this.numIncoming = data;
      this.numIncomingUpdatedSource.next(this.numIncoming);
    }, (error: any) => {
      console.error(error);
      this.notification.push('error', error);
    });
    return response;
  }

  public updateNodes(nodes) {
    // crear servicio con sistema de loading y loader component
    this.nodesUpdatedSource.next(nodes);
  }

  public updateFlows(flows) {
    this.nodeFlowsUpdatedSource.next(flows);
  }

}
