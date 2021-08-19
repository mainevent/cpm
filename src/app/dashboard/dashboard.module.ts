import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';

import { PowerMeterModule } from '../power-meter/power-meter.module';

import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,

    MatTableModule,
    MatSlideToggleModule,
    MatIconModule,

    PowerMeterModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
