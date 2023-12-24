import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-delete-confirmation-dialog',
    template: `
      <h2 mat-dialog-title>¿Está seguro de borrar "{{ data.name }}"?</h2>
      <div mat-dialog-content>
        <p>Esta acción no se puede deshacer.</p>
      </div>
      <div mat-dialog-actions>
        <button mat-button (click)="onNoClick()">No</button>
        <button mat-button color="warn" (click)="onYesClick()">Sí</button>
      </div>
    `,
  })
export class DeleteConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}