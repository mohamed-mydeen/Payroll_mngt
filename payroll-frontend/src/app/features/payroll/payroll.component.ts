import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService, Employee } from '../../core/services/employee.service';
import { PayrollService, Payroll } from '../../core/services/payroll.service';

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payroll.component.html',
  styleUrl: './payroll.component.scss'
})
export class PayrollComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployeeId: number | null = null;
  selectedMonth: number = new Date().getMonth() + 1; // 1-12
  selectedYear: number = new Date().getFullYear();
  
  generatedPayroll: Payroll | null = null;
  errorMessage = '';
  isGenerating = false;

  months = [
    { value: 1, name: 'January' }, { value: 2, name: 'February' },
    { value: 3, name: 'March' }, { value: 4, name: 'April' },
    { value: 5, name: 'May' }, { value: 6, name: 'June' },
    { value: 7, name: 'July' }, { value: 8, name: 'August' },
    { value: 9, name: 'September' }, { value: 10, name: 'October' },
    { value: 11, name: 'November' }, { value: 12, name: 'December' }
  ];

  years = [2024, 2025, 2026, 2027];

  constructor(
    private employeeService: EmployeeService,
    private payrollService: PayrollService
  ) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(data => this.employees = data);
  }

  generatePayroll() {
    if (!this.selectedEmployeeId) {
      this.errorMessage = 'Please select an employee.';
      return;
    }

    this.isGenerating = true;
    this.errorMessage = '';
    this.generatedPayroll = null;

    this.payrollService.generatePayroll(this.selectedEmployeeId, this.selectedMonth, this.selectedYear)
      .subscribe({
        next: (data) => {
          this.generatedPayroll = data;
          this.isGenerating = false;
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Failed to generate payroll';
          this.isGenerating = false;
        }
      });
  }
}
