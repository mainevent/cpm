import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-power-meter',
  templateUrl: './power-meter.component.html',
  styleUrls: ['./power-meter.component.css']
})
export class PowerMeterComponent {
  @Input() power = 0;
}
