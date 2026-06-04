import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LeaveRequest {
  id: number;
  employeeId: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private apiUrl = 'http://localhost:8080/api/leaves';

  constructor(private http: HttpClient) {}

  getAllLeaves(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(this.apiUrl);
  }

  applyLeave(leave: { employeeId: number, startDate: string, endDate: string, reason: string }): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(this.apiUrl, leave);
  }

  updateLeaveStatus(id: number, status: string): Observable<LeaveRequest> {
    return this.http.patch<LeaveRequest>(`${this.apiUrl}/${id}/status?status=${status}`, {});
  }
}
