import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '../../interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [TruncatePipe, MatButton],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  @Input() public user: User = {} as User;
  @Output() public deleteUser = new EventEmitter();
  @Output() public editUser = new EventEmitter();

  private readonly dialog = inject(MatDialog);

  public onDeleteUser(userId: number): void {
    this.deleteUser.emit(userId);
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user: this.user }
    });

    dialogRef.afterClosed().subscribe(editResult => {
      if (!editResult) return;
      this.editUser.emit(editResult);
    });
  }
}
