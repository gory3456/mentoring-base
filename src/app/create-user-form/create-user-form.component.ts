import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatButton, MatFormFieldModule, MatInputModule, NgIf],
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUserFormComponent {
  private readonly dialogRef: MatDialogRef<CreateUserFormComponent> = inject(MatDialogRef<CreateUserFormComponent>);
  private readonly data = inject(MAT_DIALOG_DATA);
  public readonly isEdit = this.data.isEdit;

  public readonly form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    website: new FormControl('', [Validators.required]),
    companyName: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    if (this.data.user) {
      this.form.patchValue({ ...this.data.user, companyName: this.data.user.company?.name });
    }
  }

  public onSave(): void {
    if (this.form.valid) {
      const updatedUser = {
        ...this.data.user,
        ...this.form.value,
        company: { name: this.form.value.companyName }
      };
      this.dialogRef.close(updatedUser);
    }
  }
  public onCancel(): void {
    this.dialogRef.close();
  }
}
