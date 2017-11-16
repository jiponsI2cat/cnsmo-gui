import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'firewall', loadChildren: './firewall/firewall.module#FirewallModule' },
            { path: 'nodes', loadChildren: './nodes/nodes.module#NodesModule' },
            { path: 'vpn', loadChildren: './vpn/vpn.module#VpnModule'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
