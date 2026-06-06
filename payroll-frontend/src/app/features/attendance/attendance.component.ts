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

  // Month filter
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;
  months = [
    { value: 1, label: 'January' }, { value: 2, label: 'February' },
    { value: 3, label: 'March' },   { value: 4, label: 'April' },
    { value: 5, label: 'May' },     { value: 6, label: 'June' },
    { value: 7, label: 'July' },    { value: 8, label: 'August' },
    { value: 9, label: 'September' },{ value: 10, label: 'October' },
    { value: 11, label: 'November' },{ value: 12, label: 'December' }
  ];
  years: number[] = [];

  displayedColumns: string[] = ['date', 'status'];
  dataSource: Attendance[] = [];

  // Summary
  presentCount = 0;
  absentCount = 0;

  errorMessage = '';
  successMessage = '';
  isSubmitting = false;
  isLoading = false;

  constructor(
    private employeeService: EmployeeService,
    private attendanceService: AttendanceService
  ) {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= currentYear - 3; y--) {
      this.years.push(y);
    }
  }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(data => this.employees = data);
  }

  onEmployeeSelect() {
    this.errorMessage = '';
    this.successMessage = '';
    if (this.selectedEmployeeId) {
      this.loadAttendanceByMonth();
    } else {
      this.dataSource = [];
      this.presentCount = 0;
      this.absentCount = 0;
    }
  }

  onMonthChange() {
    if (this.selectedEmployeeId) {
      this.loadAttendanceByMonth();
    }
  }

  loadAttendanceByMonth() {
    if (!this.selectedEmployeeId) return;
    this.isLoading = true;
    this.errorMessage = '';
    this.attendanceService.getAttendanceByMonth(
      Number(this.selectedEmployeeId),
      this.selectedYear,
      this.selectedMonth
    ).subscribe({
      next: (data) => {
        this.dataSource = data.sort((a, b) => a.date.localeCompare(b.date));
        this.presentCount = data.filter(a => a.status === 'PRESENT').length;
        this.absentCount = data.filter(a => a.status === 'ABSENT').length;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load attendance history';
        this.isLoading = false;
      }
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
      employeeId: Number(this.selectedEmployeeId),
      date: this.attendanceDate,
      status: status
    };

    this.attendanceService.markAttendance(payload).subscribe({
      next: () => {
        this.successMessage = `✓ Marked ${status} for ${this.attendanceDate}`;
        // Reload the current month view
        this.loadAttendanceByMonth();
        this.isSubmitting = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || err.error || 'Failed to mark attendance';
        this.isSubmitting = false;
      }
    });
  }

  getSelectedEmployeeName(): string {
    const emp = this.employees.find(e => e.id === Number(this.selectedEmployeeId));
    return emp ? emp.name : '';
  }

  getMonthLabel(): string {
    return this.months.find(m => m.value === this.selectedMonth)?.label || '';
  }
}
