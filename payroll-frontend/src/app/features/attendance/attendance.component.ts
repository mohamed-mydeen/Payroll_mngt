import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { EmployeeService, Employee } from '../../core/services/employee.service';
import { AttendanceService, Attendance } from '../../core/services/attendance.service';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss'
})
export class AttendanceComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployeeId: number | null = null;
  attendanceDate: string = new Date().toISOString().split('T')[0];
  
  displayedColumns: string[] = ['date', 'status'];
  dataSource: Attendance[] = [];

  errorMessage = '';
  successMessage = '';
  isSubmitting = false;

  constructor(
    private employeeService: EmployeeService,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(data => this.employees = data);
  }

  onEmployeeSelect() {
    this.errorMessage = '';
    this.successMessage = '';
    if (this.selectedEmployeeId) {
      this.loadAttendance(this.selectedEmployeeId);
    } else {
      this.dataSource = [];
    }
  }

  loadAttendance(employeeId: number) {
    this.attendanceService.getAttendanceByEmployee(employeeId).subscribe({
      next: (data) => this.dataSource = data,
      error: () => this.errorMessage = 'Failed to load attendance history'
    });
  }

  markAttendance(status: 'PRESENT' | 'ABSENT') {
    if (!this.selectedEmployeeId || !this.attendanceDate) {
      this.errorMessage = 'Please select an employee and date.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const payload = {
      employeeId: this.selectedEmployeeId,
      date: this.attendanceDate,
      status: status
    };

    this.attendanceService.markAttendance(payload).subscribe({
      next: () => {
        this.successMessage = `Attendance marked ${status} successfully!`;
        this.loadAttendance(this.selectedEmployeeId!);
        this.isSubmitting = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to mark attendance (already marked?)';
        this.isSubmitting = false;
      }
    });
  }
}
