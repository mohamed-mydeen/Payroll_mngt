import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title style="margin-bottom: 0; padding-bottom: 16px; border-bottom: 1px solid var(--border-color);">
      {{ data.title }}
    </h2>
    <mat-dialog-content style="padding-top: 20px; padding-bottom: 20px;">
      <p style="font-size: 15px;">{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end" style="padding: 16px; border-top: 1px solid var(--border-color);">
      <button class="cancel-btn" (click)="onDismiss()">Cancel</button>
      <button 
        [class]="data.isDestructive ? 'danger-btn' : 'premium-btn'" 
        (click)="onConfirm()">
        {{ data.confirmText || 'Confirm' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .cancel-btn {
      background: transparent;
      color: var(--text-secondary, #64748b);
      border: 1px solid #cbd5e1;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      margin-right: 12px;
      transition: all 0.2s;
    }
    .cancel-btn:hover {
      background: #f1f5f9;
      color: var(--text-primary, #0f172a);
    }
    .danger-btn {
      background: var(--danger);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }
    .danger-btn:hover {
      background: #c82333;
    }
    .premium-btn {
      background: var(--primary);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }
    .premium-btn:hover {
      background: var(--primary-hover);
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string, confirmText?: string, isDestructive?: boolean }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
