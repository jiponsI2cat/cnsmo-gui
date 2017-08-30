import { FirewallService } from './shared/firewall.service';
import { Component, OnInit } from '@angular/core';
import { Rule } from './shared/rule';

@Component({
  selector: 'app-firewall-rules',
  templateUrl: './firewall-rules.component.html',
  styleUrls: ['./firewall-rules.component.css']
})
export class FirewallRulesComponent implements OnInit {
  rules: Rule[];
  constructor(private firewallService: FirewallService) {
    firewallService.rulesUpdated$.subscribe(rules => { this.rules = rules; });
  }

  ngOnInit() {
    this.firewallService.getRules();
  }

}
