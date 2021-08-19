import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface DashboardEntry {
  id: number;
  connectedTime: number;
  power: number;
  occupied: boolean;
  time?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  root = 'http://localhost:8080/cpm/'

  constructor(
    private http: HttpClient,
  ) { }

  getDashboardData() {
    return this.http.get<DashboardEntry[]>(this.root + 'dashboard');
  }

  plugEV(id: number) {
    return this.http.put(this.root + 'management/plug/' + id, {})
  }

  unplugEV(id: number) {
    return this.http.put(this.root + 'management/unplug/' + id, {})
  }
}
