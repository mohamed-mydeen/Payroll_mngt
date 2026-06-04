import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../../../core/services/employee.service';

@Component({
  selector: 'app-employee-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './employee-dialog.component.html',
  styleUrl: './employee-dialog.component.scss'
})
export class EmployeeDialogComponent {
  employeeForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  isEditMode = false;
  employeeId?: number;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmployeeDialogComponent>,
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data?.employee;
    this.employeeId = data?.employee?.id;

    this.employeeForm = this.fb.group({
      name: [data?.employee?.name || '', Validators.required],
      email: [data?.employee?.email || '', [Validators.required, Validators.email]],
      roleType: [data?.employee?.roleType || 'WFH', Validators.required],
      salaryType: [data?.employee?.salaryType || 'MONTHLY', Validators.required],
      salaryAmount: [data?.employee?.salaryAmount || 0, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.isSubmitting = true;
      const payload = {
        ...this.employeeForm.value,
        systemRole: 'ROLE_EMPLOYEE'
      };

      const request$ = this.isEditMode 
        ? this.employeeService.updateEmployee(this.employeeId!, payload)
        : this.employeeService.createEmployee(payload);

      request$.subscribe({
        next: (result) => {
          this.dialogRef.close(result);
        },
        error: (err) => {
          this.errorMessage = `Failed to ${this.isEditMode ? 'update' : 'create'} employee: ` + (err.error?.message || 'Server error');
          this.isSubmitting = false;
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
