import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../core/notification/notification.service';
import { HttpClientService } from '../../core/http-client.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-application-layout',
  templateUrl: './application-layout.component.html',
  styleUrls: ['./application-layout.component.scss']
})
export class ApplicationLayoutComponent implements OnInit {
  private serviceForm: FormGroup;
  private msgResult = '';
  closeResult: string;

  operations = [
    {
      name: "Configure Firewall"
    },
    {
      name: "Configure Port"
    }
  ]

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.serviceForm = this.formBuilder.group({
      ip: ['', Validators.required],
      port: ['', Validators.required],
    });
  }

  logout() {
    this.auth.logout();
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
