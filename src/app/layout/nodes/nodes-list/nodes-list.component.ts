import { NodesService } from '../shared/nodes.service';
import { Component, OnInit } from '@angular/core';
import { Node } from '../shared/node';

@Component({
  selector: 'app-nodes-list',
  templateUrl: './nodes-list.component.html',
  styleUrls: ['./nodes-list.component.scss']
})
export class NodesListComponent implements OnInit {
  nodes: Node[];
  constructor(private nodesService: NodesService) {
    nodesService.nodesUpdated$.subscribe(nodes => { this.nodes = nodes; });
  }

  ngOnInit() {
    this.nodesService.getNodes();
  }

}
