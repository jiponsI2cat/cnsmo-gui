import { Node } from './node';
import { Router } from '@angular/router';
import { HttpClientService } from 'app/core/http-client.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NodesService {


  /******** Client Nodes: Source, Observable and List *********/
  private nodesUpdatedSource = new Subject<Node[]>();       /**/
  nodesUpdated$ = this.nodesUpdatedSource.asObservable();   /**/
  nodes: Node[];                                            /**/
  /************************************************************/

  constructor(
    private http: HttpClientService,
    private router: Router
  ) { }

  /**
   * This method do a request for the list of nodes and update the status
   * of nodes source in order to ensure that subscribers will fire
   * subscribe event and update their list of sdn nodes
   * @param callback
   */
  public getNodes(callback?) {
    // TODO: hacer el get de las nodes ya iniciadas en el server y llamar el
    // metodo updateNodes
    const response = this.http.get('/services/sdn/nodes').finally(() => {
      if (callback) {
        callback.apply();
      }
    });
    response.subscribe((data: any) => {

      this.nodes = data;
      this.updateNodes(data);
    }, (error: any) => {
      console.log(error);
      // this.notification.error('Cannot Login!');
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
      console.log(data);
    }, (error: any) => {
      console.log(error);
      // this.notification.error('Cannot Login!');
    });
    return response;
  }

  public updateNodes(nodes) {
    // crear servicio con sistema de loading y loader component
    this.nodesUpdatedSource.next(nodes);
  }
}
