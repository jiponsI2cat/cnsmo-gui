import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'app/router.animations';

@Component({
  selector: 'app-vpn',
  templateUrl: './vpn.component.html',
  styleUrls: ['./vpn.component.scss'],
  animations: [routerTransition()]
})
export class VpnComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
