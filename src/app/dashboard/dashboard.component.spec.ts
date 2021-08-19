import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { PowerMeterComponent } from '../power-meter/power-meter.component';

import { MatTableModule } from '@angular/material/table';

import { DashboardService } from './dashboard.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let table: HTMLElement;
  let service: DashboardService;

  const displayedColumns: string[] = ['id', 'connectedTime', 'power', 'occupied', 'action'];


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatTableModule],
      declarations: [ DashboardComponent, PowerMeterComponent ],
      providers: [DashboardService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    service = TestBed.inject(DashboardService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    table = fixture.nativeElement.querySelector('table');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the table', () => {
    expect(table).toBeTruthy();
  });

  it('table columns should be defined', () => {
    expect(component.displayedColumns).toEqual(displayedColumns);
  });

  it('should toggle plugging CP', fakeAsync(() => {
    spyOn(service, 'plugEV').and.returnValue(of(Promise.resolve()));
    spyOn(service, 'getDashboardData').and.returnValue(of([]));
    component.toggleEV({checked: true}, 1);
    expect(service.plugEV).toHaveBeenCalledWith(1);
    expect(service.getDashboardData).toHaveBeenCalled();
  }));
});
