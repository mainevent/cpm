import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DashboardService } from './dashboard.service';

import { map, takeUntil } from 'rxjs/operators';
import { Subject, timer } from 'rxjs';

import { millisecondsToHours, millisecondsToMinutes, millisecondsToSeconds } from 'date-fns'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  dashboardData = [];
  displayedColumns: string[] = ['id', 'connectedTime', 'power', 'occupied', 'action'];
  fastCharging: number;
  normalCharging: number;
  usedPower: number;
  destroy$ = new Subject();

  constructor(
    private dashboard: DashboardService
  ) { }

  ngOnInit(): void {
    this.getDashboard();
  }

  toggleEV(toggle: MatSlideToggleChange | any, id: number) {
    if (toggle.checked) {
      this.dashboard.plugEV(id).subscribe(_ => {
        this.getDashboard();
      });
    } else {
      this.dashboard.unplugEV(id).subscribe(_ => {
        this.getDashboard();
      });
    }
  }

  getDashboard() {
    this.dashboard.getDashboardData().pipe(
      map(data => {
        return data.map(entry => ({
          ...entry,
          time: this.runTimer(entry.connectedTime)
        }))
      })
    ).subscribe(data => {
      this.dashboardData = data;
      this.getPowerConsumption();
    });
  }

  runTimer(time) {
    if (time) {
      const source = timer(0, 1000);
      const diff = Date.now() - time;

      return source.pipe(
        takeUntil(this.destroy$),
        map(val => {
          const h = millisecondsToHours(diff + val * 1000);
          const m = millisecondsToMinutes(diff + val * 1000 - h * 3600 * 1000);
          const s = millisecondsToSeconds(diff + val * 1000 - h * 3600 * 1000 - m * 60 * 1000);

          return `${h} : ${m < 10 ? '0' + m : m} : ${s < 10 ? '0' + s : s}`;
      }));
    }
  }

  getPowerConsumption() {
    let usedPower = 0;
    let fastCharging = 0;
    let normalCharging = 0;

    for (const item of this.dashboardData) {
      if (item) {
        usedPower += item.power;
        fastCharging += item.power === 20 ? 1 : 0;
        normalCharging += item.power === 10 ? 1 : 0;
      }
    }
    this.usedPower = usedPower;
    this.fastCharging = fastCharging;
    this.normalCharging = normalCharging;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
