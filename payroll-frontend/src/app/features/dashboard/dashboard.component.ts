import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../core/services/employee.service';
import { LeaveService } from '../../core/services/leave.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  totalEmployees = 0;
  pendingLeaves = 0;
  approvedLeaves = 0;
  rejectedLeaves = 0;

  constructor(
    private employeeService: EmployeeService,
    private leaveService: LeaveService
  ) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(data => {
      this.totalEmployees = data.length;
    });

    this.leaveService.getAllLeaves().subscribe(data => {
      this.pendingLeaves = data.filter(l => l.status === 'PENDING').length;
      this.approvedLeaves = data.filter(l => l.status === 'APPROVED').length;
      this.rejectedLeaves = data.filter(l => l.status === 'REJECTED').length;
    });
  }
}
