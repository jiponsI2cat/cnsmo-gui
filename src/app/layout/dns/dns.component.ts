import { routerTransition } from '../../router.animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dns',
  templateUrl: './dns.component.html',
  styleUrls: ['./dns.component.scss'],
  animations: [routerTransition()]

})
export class DnsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
