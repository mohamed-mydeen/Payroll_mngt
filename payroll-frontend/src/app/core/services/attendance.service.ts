import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Attendance {
  id: number;
  employeeId: number;
  date: string;
  status: 'PRESENT' | 'ABSENT';
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = `${environment.apiUrl}/attendance`;

  constructor(private http: HttpClient) {}

  getAttendanceByEmployee(employeeId: number): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/employee/${employeeId}`);
  }

  getAttendanceByMonth(employeeId: number, year: number, month: number): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(
      `${this.apiUrl}/employee/${employeeId}/month?year=${year}&month=${month}`
    );
  }

  markAttendance(attendance: { employeeId: number; date: string; status: string }): Observable<Attendance> {
    return this.http.post<Attendance>(this.apiUrl, attendance);
  }
}
