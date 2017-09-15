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


  /******** Client Nodes: Source, Observable and List ***************/
  private nodesUpdatedSource = new Subject<Node[]>();             /**/
  nodesUpdated$ = this.nodesUpdatedSource.asObservable();         /**/
  nodes: Node[];                                                  /**/
  /**/
  private nodeFlowsUpdatedSource = new Subject<number[]>();       /**/
  nodeFlowsUpdated$ = this.nodeFlowsUpdatedSource.asObservable(); /**/
  flows = { 'initValue': [] };                                    /**/
  /******************************************************************/

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
        this.notification.push('info', `Nodes are updated`, 2000);
      }
    }, (error: any) => {
      console.error(error);
    });
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
        this.notification.push('info', `${instanceId}'s flows are updated`, 2000);
      }
    }, (error: any) => {
      this.flows[instanceId] = [-1];
      this.updateFlows(this.flows);
      console.error(error);
      // this.notification.error('Cannot Login!');
    });
  }

  public blockPort(instanceId, port, callback?) {
    const api = environment.api.split('/')[2].split(':')[0];
    const reqData = {
      'tcp-destination-port': port,
      'ip4-destination': `${api}/16`,
      'ssinstanceid': instanceId
    }
    const response = this.http.put(`/services/sdn/blockByPort`, reqData).finally(() => {
      if (callback) {
        callback.apply();
      }
    });
    response.subscribe(() => {
      this.flows[instanceId].push(port);
      this.updateFlows(this.flows);
    }, (error: any) => {
      console.error(error);
      // this.notification.error('Cannot Login!');
    });
  }

  public updateNodes(nodes) {
    // crear servicio con sistema de loading y loader component
    this.nodesUpdatedSource.next(nodes);
  }

  public updateFlows(flows) {
    this.nodeFlowsUpdatedSource.next(flows);
  }

}
