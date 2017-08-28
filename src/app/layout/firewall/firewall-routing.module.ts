import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirewallComponent } from './firewall.component';

const routes: Routes = [
    { path: '', component: FirewallComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FirewallRoutingModule { }
