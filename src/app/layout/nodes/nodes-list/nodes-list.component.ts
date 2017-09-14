import { NodesService } from '../shared/nodes.service';
import { Component, OnInit } from '@angular/core';
import { NgbAccordionModule, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';


import { Node } from '../shared/node';

@Component({
  selector: 'app-nodes-list',
  templateUrl: './nodes-list.component.html',
  styleUrls: ['./nodes-list.component.scss'],
  providers: [NgbAccordionConfig]
})
export class NodesListComponent implements OnInit {
  nodes: Node[];
  loading: boolean;
  openedPanels = [];

  constructor(private nodesService: NodesService, private config: NgbAccordionConfig) {
    nodesService.nodesUpdated$.subscribe(nodes => {
      this.nodes = nodes;
      this.loading = false;
    });
  }

  ngOnInit() {
    this.loading = true;
    this.nodesService.getNodes();
  }

  beforeChange(clicckedPanel) {
    this.openedPanels[clicckedPanel.panelId] = clicckedPanel.nextState;
    for (const panel in this.openedPanels) {
      if (panel !== clicckedPanel.panelId) {
        this.openedPanels[panel] = false;
      }
    }
  }

}
