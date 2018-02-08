import { Component, OnChanges, Input, OnInit } from '@angular/core';
import { NgModel, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap/modal/modal';

import { NodesService } from '../shared/nodes.service';
import { environment } from '../../../../environments/environment';
import { Helpers } from 'app/shared/helpers';

@Component({
  selector: 'app-nodes-flows',
  templateUrl: './nodes-flows.component.html',
  styleUrls: ['./nodes-flows.component.scss']
})

export class NodesFlowsComponent implements OnChanges, OnInit {
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
  chart: any;
  options: any;
  modalOptions: NgbModalOptions = {}
  isOpenMonitoring: boolean;

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

    nodesService.numPacketsUpdated$.subscribe(numPackets => this.chart.series[0].addPoint(numPackets, true, true));

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
    })
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

    this.options = {
      chart: {
        type: 'spline',
        width: null,
        zoomType: 'Xy'
      },
      title: { text: 'Monitoring' },
      series: [{ name: 'Packets number', data: [0, 0, 0, 0, 0, 0, 0] }]
    };


    const refresh = setInterval(() => this.nodesService.getNumPackets(this.instanceId, this.monitorId)
      , 3000);
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      clearInterval(refresh);
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      clearInterval(refresh);
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
