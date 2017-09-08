import { NodesService } from '../shared/nodes.service';
import { Component, OnChanges, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-nodes-flows',
  templateUrl: './nodes-flows.component.html',
  styleUrls: ['./nodes-flows.component.scss']
})
export class NodesFlowsComponent implements OnChanges {
  @Input() instanceId;
  flows: number[];
  loading = true;
  port = '';
  constructor(private nodesService: NodesService) {
    nodesService.nodeFlowsUpdated$.subscribe(flows => { this.flows = flows; this.loading = false; });
  }

  ngOnChanges(input) {
    if (input.instanceId) {
      this.loading = true;
      this.nodesService.getFlowsByNode(this.instanceId);
    }
  }

  blockPort(port) {
    this.loading = true;
    this.nodesService.blockPort(this.instanceId, port);
    this.port = '';
  }

}
