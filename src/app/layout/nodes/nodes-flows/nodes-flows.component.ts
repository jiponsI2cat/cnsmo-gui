import { NodesService } from '../shared/nodes.service';
import { Component, OnChanges, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import { environment } from '../../../../environments/environment';

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
  defaultDestinationAddress = `${environment.api.split('/')[2].split(':')[0]}/16`;
  constructor(private nodesService: NodesService) {
    nodesService.nodeFlowsUpdated$.subscribe(flows => {
      this.flows = flows;
      if (this.flows[this.instanceId]) { this.loading = false; }
    });
  }

  ngOnChanges(input) {
    if (input.instanceId) {
      this.loading = true;
      this.nodesService.getFlowsByNode(this.instanceId);
    }
  }

  blockPort(destinationPort, destinationAddress) {
    this.loading = true;
    this.nodesService.blockPort(this.instanceId, destinationPort, destinationAddress || this.defaultDestinationAddress);
    this.port = '';
  }

}
