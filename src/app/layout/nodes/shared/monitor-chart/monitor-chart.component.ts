import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NodesService } from '../nodes.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-monitor-chart',
  templateUrl: './monitor-chart.component.html',
  styleUrls: ['./monitor-chart.component.scss']
})

export class MonitorChartComponent implements OnInit, OnDestroy {

  @Input() instanceId;
  chart;
  subscription: Subscription;
  subscriptionUpdate: Subscription;
  loadingValue;

  options = {
    chart: {
      type: 'spline',
      width: null,
      zoomType: 'Xy'
    },
    title: { text: 'Monitor Incoming Traffic' },
    series: [
      { name: 'Incoming', data: [0, 0, 0, 0, 0] },
      { name: 'Outcoming', data: [0, 0, 0, 0, 0] }
    ]
  };

  constructor(private nodesService: NodesService) {
    this.subscriptionUpdate = this.nodesService.numIncomingUpdated$.subscribe(data => {
      this.chart.series[0].addPoint((data as any).inTraffic, true, true);
      this.chart.series[1].addPoint((data as any).outTraffic, true, true);
    });
  }

  ngOnInit() {
    this.loadingValue = 20;
    let i = 2;
    const temp = setInterval(() => {
      this.loadingValue += 10 / i;
      i++;
    }, 5
    );
    this.subscription = this.nodesService.getNumIncoming(this.instanceId).subscribe(() => {
      clearInterval(temp);
      this.loadingValue = 100;
      this.ngOnInit();
    });
  }

  saveInstance(chartInstance) {
    this.chart = chartInstance;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionUpdate.unsubscribe();
  }

}
