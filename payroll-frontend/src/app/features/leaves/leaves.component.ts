import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LeaveService, LeaveRequest } from '../../core/services/leave.service';
import { EmployeeService, Employee } from '../../core/services/employee.service';
import { LeaveDialogComponent } from './leave-dialog/leave-dialog.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-leaves',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatDialogModule],
  templateUrl: './leaves.component.html',
  styleUrl: './leaves.component.scss'
})
export class LeavesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'employee', 'dates', 'reason', 'status', 'actions'];
  dataSource: LeaveRequest[] = [];
  employeesMap: { [id: number]: string } = {};

  constructor(
    private leaveService: LeaveService,
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(employees => {
      employees.forEach(emp => this.employeesMap[emp.id] = emp.name);
      this.loadLeaves();
    });
  }

  loadLeaves() {
    this.leaveService.getAllLeaves().subscribe({
      next: (data) => this.dataSource = data,
      error: (err) => console.error('Failed to load leaves', err)
    });
  }

  getEmployeeName(id: number): string {
    return this.employeesMap[id] || `Employee #${id}`;
  }

  openApplyLeaveDialog() {
    const dialogRef = this.dialog.open(LeaveDialogComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadLeaves();
      }
    });
  }

  updateStatus(id: number, status: 'APPROVED' | 'REJECTED') {
    const isApproved = status === 'APPROVED';
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: isApproved ? 'Approve Leave' : 'Reject Leave',
        message: `Are you sure you want to ${status.toLowerCase()} this leave request?`,
        confirmText: isApproved ? 'Approve' : 'Reject',
        isDestructive: !isApproved
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.leaveService.updateLeaveStatus(id, status).subscribe({
          next: () => this.loadLeaves(),
          error: (err) => console.error('Failed to update status', err)
        });
      }
    });
  }
}
