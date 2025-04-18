import { LocalStorageService } from './../services/local-storage.service';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AsyncPipe, NgForOf } from '@angular/common';
import { UserCardComponent } from './user-card/user-card.component';
import { CreateUserFormComponent } from '../create-user-form/create-user-form.component';
import { HeaderComponent } from '../header/header.component';
import { ShadowDirectiveDirective } from '../directives/shadow-directive.directive';
import { User } from '../interfaces/user';
import { Store } from '@ngrx/store';
import { addUser, deleteUser, loadUsers, loadUsersSuccess, updateUser } from './store/users.action';
import { selectUsers } from './store/users.selectors';
import { IUsersState } from '../interfaces/userState.interface';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgForOf, UserCardComponent, AsyncPipe, CreateUserFormComponent, HeaderComponent, ShadowDirectiveDirective],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit {
  private readonly store = inject(Store<IUsersState>);
  public readonly users$ = this.store.select(selectUsers);
  private readonly dialog = inject(MatDialog);
  private readonly localStorageService = inject(LocalStorageService);

  ngOnInit(): void {
    const localUsers: User[] | null = this.localStorageService.getUsers();
    if (localUsers && localUsers.length > 0) {
      this.store.dispatch(loadUsersSuccess({ users: localUsers }));
    } else {
      this.store.dispatch(loadUsers());
    }
  }

  public onDeleteUser(id: number): void {
    this.store.dispatch(deleteUser({ userId: id }));
  }

  public openDialog(user?: User): void {
    const dialogRef: MatDialogRef<CreateUserFormComponent> = this.dialog.open(CreateUserFormComponent, {
      width: '40%',
      data: { user: user || {}, isEdit: !!user }
    });
    dialogRef.afterClosed().subscribe(newUser => {
      if (newUser) {
        if (user) {
          this.store.dispatch(updateUser({ user: newUser }));
        } else {
          this.store.dispatch(addUser({ user: newUser }));
        }
      }
    });
  }
}
