import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordsListComponent } from './records-list/records-list.component';
import { DnsComponent } from './dns.component';


const routes: Routes = [
  { path: '', component: DnsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DnsRoutingModule { }
