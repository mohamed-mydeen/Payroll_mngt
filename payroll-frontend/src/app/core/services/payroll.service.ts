import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Payroll {
  id: number;
  employeeId: number;
  month: number;
  year: number;
  totalPresent: number;
  calculatedSalary: number;
}

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  private apiUrl = 'http://localhost:8080/api/payroll';

  constructor(private http: HttpClient) {}

  generatePayroll(employeeId: number, month: number, year: number): Observable<Payroll> {
    return this.http.post<Payroll>(`${this.apiUrl}/generate/${employeeId}?month=${month}&year=${year}`, {});
  }
}
