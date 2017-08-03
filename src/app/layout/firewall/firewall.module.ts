import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { FirewallRoutingModule } from './firewall-routing.module';
import { FirewallComponent } from './firewall.component';
import { PageHeaderModule } from '../../shared';
import { AddFirewallRuleComponent } from 'app/layout/firewall/add-firewall-rule.component';
import { FirewallRulesComponent } from 'app/layout/firewall/firewall-rules.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { FirewallService } from 'app/layout/firewall/shared/firewall.service';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        FirewallRoutingModule,
        ReactiveFormsModule,
        PageHeaderModule,
        SharedModule
    ],
    declarations: [FirewallComponent, AddFirewallRuleComponent, FirewallRulesComponent],
    providers: [FirewallService]
})
export class FirewallModule { }
