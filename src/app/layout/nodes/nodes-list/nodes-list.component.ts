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
  options;
  chart;

  constructor(private nodesService: NodesService, private config: NgbAccordionConfig) {
    nodesService.nodesUpdated$.subscribe(nodes => {
      this.nodes = nodes;
      this.loading = false;
    });
  }

  saveInstance(chartInstance) {
    this.chart = chartInstance;
  }

  ngOnInit() {
    this.loading = true;
    this.nodesService.getNodes();

    this.options = {
      chart: {
        type: 'spline',
        width: null,
        zoomType: 'Xy'
      },
      title: { text: 'Monitoring' },
      series: [
        { name: 'Incoming', data: [0, 0, 0, 0, 0, 0, 0] },
        { name: 'Outcoming', data: [0, 0, 0, 0, 0, 0, 0] }
      ]
    };

    this.nodesService.numIncomingUpdated$.subscribe(data => {
      this.chart.series[0].addPoint((data as any).inTraffic, true, true);
      this.chart.series[0].addPoint((data as any).outTraffic, true, true);
    });

    const refresh = setInterval(() => this.nodesService.getNumIncoming('Client.1')
    , 60000);


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
