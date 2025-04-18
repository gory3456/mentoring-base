import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '../../interfaces/user';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [TruncatePipe, MatButton, CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  @Input() public user!: User;
  @Output() public deleteUser: EventEmitter<number> = new EventEmitter<number>();
  @Output() public editUser: EventEmitter<User> = new EventEmitter<User>();

  public onDeleteUser(user: User): void {
    this.deleteUser.emit(user.id);
  }

  public onEditUser(user: User): void {
    this.editUser.emit(user);
  }
}
