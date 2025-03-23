import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly usersSubject$ = new BehaviorSubject<User[]>([]);
  public readonly users$ = this.usersSubject$.asObservable();
  constructor(private localStorageService: LocalStorageService) {
    const usersFromStorage = this.localStorageService.getUsers();
    if (usersFromStorage) {
      this.usersSubject$.next(usersFromStorage);
    }
  }
  public setUsers(users: User[]): void {
    this.usersSubject$.next(users);
    this.localStorageService.setUsers(users);
  }
  public editUser(editedUser: User): void {
    const updatedUser = this.usersSubject$.value.map(user => (user.id === editedUser.id ? editedUser : user));
    this.usersSubject$.next(updatedUser);
    this.localStorageService.setUsers(updatedUser);
  }
  public createUser(user: User) {
    const existingUser = this.usersSubject$.value.find(currentElement => currentElement.email === user.email);
    if (existingUser) {
      alert('ТАКОЙ EMAIL УЖЕ ЗАРЕГИСТРИРОВАН');
    } else {
      const updatedUsers = [...this.usersSubject$.value, user];
      this.usersSubject$.next(updatedUsers);
      this.localStorageService.setUsers(updatedUsers);
      alert('НОВЫЙ ПОЛЬЗОВАТЕЛЬ УСПЕШНО ДОБАВЛЕН');
    }
  }
  public deleteUser(id: number) {
    const updatedUsers = this.usersSubject$.value.filter(user => user.id !== id);
    this.usersSubject$.next(updatedUsers);
    this.localStorageService.setUsers(updatedUsers);
  }
}
