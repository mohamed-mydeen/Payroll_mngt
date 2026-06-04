import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmployeeService, Employee } from '../../core/services/employee.service';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatDialogModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'roleType', 'salaryAmount', 'actions'];
  dataSource: Employee[] = [];
  isLoading: boolean = true;

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.isLoading = true;
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.dataSource = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching employees', err);
        this.isLoading = false;
      }
    });
  }

  openAddEmployeeDialog() {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '500px',
      disableClose: true,
      data: { employee: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEmployees();
      }
    });
  }

  editEmployee(employee: Employee) {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '500px',
      disableClose: true,
      data: { employee: employee }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEmployees();
      }
    });
  }

  deleteEmployee(employee: Employee) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Employee',
        message: `Are you sure you want to delete ${employee.name}? This action cannot be undone.`,
        confirmText: 'Delete',
        isDestructive: true
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.employeeService.deleteEmployee(employee.id).subscribe({
          next: () => this.loadEmployees(),
          error: (err) => console.error('Error deleting employee', err)
        });
      }
    });
  }
}
