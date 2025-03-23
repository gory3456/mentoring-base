import { LocalStorageService } from './../services/local-storage.service';
import { UsersService } from '../services/users.service';
import { UsersApiService } from '../services/users-api.service';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { UserCardComponent } from './user-card/user-card.component';
import { CreateUserFormComponent } from '../create-user-form/create-user-form.component';
import { HeaderComponent } from '../header/header.component';
import { ShadowDirectiveDirective } from '../directives/shadow-directive.directive';
import { User } from '../interfaces/user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgForOf, UserCardComponent, AsyncPipe, CreateUserFormComponent, HeaderComponent, ShadowDirectiveDirective],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {
  readonly usersApiService = inject(UsersApiService);
  readonly usersService = inject(UsersService);
  users$ = this.usersService.users$;
  private readonly LocalStorageService = inject(LocalStorageService);
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const usersFromStorage = this.LocalStorageService.getUsers();

    if (usersFromStorage && usersFromStorage.length) {
      this.usersService.setUsers(usersFromStorage);
    } else {
      this.usersApiService
        .getUsers()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(users => this.usersService.setUsers(users));
    }
  }

  public deleteUser(id: number): void {
    this.usersService.deleteUser(id);
  }

  public editUser(user: { companyName: string } & User): void {
    this.usersService.editUser({
      ...user,
      company: {
        name: user.companyName
      }
    });
  }

  public createUser(formData: { name: string; email: string; website: string; companyName: string }): void {
    this.usersService.createUser({
      id: new Date().getTime(),
      name: formData.name,
      email: formData.email,
      website: formData.website,
      company: {
        name: formData.companyName
      }
    });
  }
}
