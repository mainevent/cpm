import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PowerMeterComponent } from './power-meter.component';



@NgModule({
  declarations: [
    PowerMeterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PowerMeterComponent
  ]
})
export class PowerMeterModule { }
