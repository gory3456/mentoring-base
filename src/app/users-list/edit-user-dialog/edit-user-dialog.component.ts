import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, NgModule } from '@angular/core';
import { MatError } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import { User } from '../../interfaces/user';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, MatDialogClose, MatFormField, MatInput, MatLabel, MatError, MatButton, MatTooltipModule],
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserDialogComponent {
  public readonly data = inject<{ user: User }>(MAT_DIALOG_DATA);
  public readonly dialogRef = inject(MatDialogRef<EditUserDialogComponent>);

  public readonly form = new FormGroup({
    name: new FormControl(this.data.user.name, [Validators.required, Validators.minLength(2)]),
    email: new FormControl(this.data.user.email, [Validators.required, Validators.email]),
    website: new FormControl(this.data.user.website, [Validators.required]),
    companyName: new FormControl(this.data.user.company.name, [Validators.required])
  });

  public get userWithUpdatedFields(): User {
    return {
      ...this.form.value,
      id: this.data.user.id
    } as User;
  }
}
