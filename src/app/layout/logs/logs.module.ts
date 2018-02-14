import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsComponent } from './logs.component';
import { LogsRoutingModule } from './logs-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    LogsRoutingModule,
    SharedModule
  ],
  declarations: [LogsComponent]
})
export class LogsModule { }
