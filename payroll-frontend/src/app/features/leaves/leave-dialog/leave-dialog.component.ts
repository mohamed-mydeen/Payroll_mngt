import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { LeaveService } from '../../../core/services/leave.service';
import { EmployeeService, Employee } from '../../../core/services/employee.service';

@Component({
  selector: 'app-leave-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './leave-dialog.component.html',
  styleUrl: './leave-dialog.component.scss'
})
export class LeaveDialogComponent implements OnInit {
  leaveForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  employees: Employee[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LeaveDialogComponent>,
    private leaveService: LeaveService,
    private employeeService: EmployeeService
  ) {
    this.leaveForm = this.fb.group({
      employeeId: [null, Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(data => this.employees = data);
  }

  onSubmit() {
    if (this.leaveForm.valid) {
      this.isSubmitting = true;
      this.leaveService.applyLeave(this.leaveForm.value).subscribe({
        next: (result) => {
          this.dialogRef.close(result);
        },
        error: (err) => {
          this.errorMessage = 'Failed to apply for leave';
          this.isSubmitting = false;
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
