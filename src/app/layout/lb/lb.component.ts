import { Component, OnInit } from '@angular/core';
import { NodesService } from '../nodes/shared/nodes.service';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lb',
  templateUrl: './lb.component.html',
  styleUrls: ['./lb.component.scss']
})
export class LbComponent implements OnInit {
  client;
  loading: boolean;
  openedPanels = [];
  options;
  chart;

  constructor(private nodesService: NodesService, private config: NgbAccordionConfig) {
    nodesService.nodesUpdated$.subscribe(nodes => {
      this.client = nodes[0].instanceId.split('.')[0];
      this.loading = false;
    });
  }

  ngOnInit() {
    this.loading = true;
    this.nodesService.getNodes();
  }

}
