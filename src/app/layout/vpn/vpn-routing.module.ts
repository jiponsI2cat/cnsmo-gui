import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { VpnComponent } from './vpn.component';

const routes: Routes = [
    { path: '', component: VpnComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VpnRoutingModule { }



