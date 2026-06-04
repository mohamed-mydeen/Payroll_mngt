import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:8080/api/attendance';

  constructor(private http: HttpClient) {}

  getAttendanceByEmployee(employeeId: number): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/employee/${employeeId}`);
  }

  markAttendance(attendance: { employeeId: number, date: string, status: string }): Observable<Attendance> {
    return this.http.post<Attendance>(this.apiUrl, attendance);
  }
}
