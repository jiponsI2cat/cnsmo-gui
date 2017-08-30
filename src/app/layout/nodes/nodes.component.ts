import { routerTransition } from '../../router.animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.scss'],
  animations: [routerTransition()]
})
export class NodesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
