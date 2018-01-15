import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from 'app/shared';

const routes: Routes = [
    {
        path: '', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'firewall', loadChildren: './firewall/firewall.module#FirewallModule' },
            { path: 'nodes', loadChildren: './nodes/nodes.module#NodesModule' },
            { path: 'vpn', loadChildren: './vpn/vpn.module#VpnModule' },
            { path: 'dns', loadChildren: './dns/dns.module#DnsModule'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
