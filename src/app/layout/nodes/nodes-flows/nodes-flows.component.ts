import { Component, OnChanges, Input, OnInit, OnDestroy } from '@angular/core';
import { NgModel, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap/modal/modal';

import { NodesService } from '../shared/nodes.service';
import { environment } from '../../../../environments/environment';
import { Helpers } from 'app/shared/helpers';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-nodes-flows',
  templateUrl: './nodes-flows.component.html',
  styleUrls: ['./nodes-flows.component.scss']
})

export class NodesFlowsComponent implements OnChanges, OnInit, OnDestroy {
  private addPortForm: FormGroup;
  @Input() instanceId;
  @Input() clientIp;
  private defaultDestinationAddress = `${this.clientIp/* environment.api.split('/')[2].split(':')[0] */}/24`;
  flows: number[];
  loading = true;
  port = '';
  deletingFlowId;
  closeResult: string;
  monitorId;
  numPacketsLength = 0;
  chart: any;
  modalOptions: NgbModalOptions = {}
  isOpenMonitoring: boolean;
  subscription: Subscription;
  timeout;
  options = {
    chart: {
      type: 'spline',
      width: null,
      zoomType: 'Xy'
    },
    title: { text: '' },
    series: [{ name: 'Byte per seconds', data: [] }]
  };
  numPoints = 20;

  saveInstance(chartInstance) {
    this.chart = chartInstance;
  }

  constructor(
    private formBuilder: FormBuilder,
    private nodesService: NodesService,
    private modalService: NgbModal,
  ) {
    nodesService.nodeFlowsUpdated$.subscribe(flows => {
      this.flows = flows;
      if (this.flows[this.instanceId]) { this.loading = false; }
    });
  }
  ngOnChanges(input) {
    if (input.clientIp) {
      this.defaultDestinationAddress = `${this.clientIp}/24`;
    }
    if (input.instanceId) {
      this.loading = true;
      this.nodesService.getFlowsByNode(this.instanceId);
    }
  }

  ngOnInit() {
    this.addPortForm = this.formBuilder.group({
      destinationPort: [
        '', [
          Validators.required,
          Validators.min(0),
          Validators.max(65535)]
      ],
      destinationAddress: [
        '',
        [Validators.pattern(Helpers.ipMaskRegEx)]
      ]
    });

    this.nodesService.numPacketsUpdated$.subscribe((numPackets) => {
      if (this.numPacketsLength < 5) {
        this.numPacketsLength += (numPackets.length > 0) ? 1 : 0;
      }
      if (numPackets.length > 1) {
        console.log('Num packets anterior' + numPackets[0]);
        console.log('Num packets actual' + numPackets[1]);
        console.log(numPackets);

        const byterate = numPackets[1] - numPackets[0];

        if (this.chart && this.chart.series[0].processedXData.length === this.numPoints) {
          this.chart.series[0].addPoint(byterate, true, true);
          return;
        }
        this.chart.series[0].addPoint(byterate);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  blockPort() {
    this.loading = true;
    const destinationPort = this.addPortForm.value.destinationPort
    const destinationAddress = this.addPortForm.value.destinationAddress
    this.nodesService.blockPort(
      this.instanceId,
      destinationPort,
      destinationAddress || this.defaultDestinationAddress
    );
    this.port = '';
  }

  deleteFlow(flowId) {
    this.nodesService.deleteFlow(this.instanceId, flowId);
  }

  open(content, monitorId: string) {
    this.modalOptions.size = 'lg';
    this.monitorId = monitorId;

    if (this.chart) {
      this.chart.series[0].setData([]);
      this.numPacketsLength = 0;
    }

    this.launchMonitoring();


    this.modalService.open(content, this.modalOptions).result.then((result) => {
      clearTimeout(this.timeout);
      this.subscription.unsubscribe();

      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      clearTimeout(this.timeout);
      this.subscription.unsubscribe();
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  launchMonitoring() {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.timeout = setTimeout(() => {
      this.subscription = this.nodesService.getNumPackets(this.instanceId, this.monitorId).subscribe(() => {
        this.launchMonitoring();
      });
    }, this.numPacketsLength > 4 ? 3000 : 100);

  }

  private getDismissReason(reason: any): string {
    this.isOpenMonitoring = false;
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
