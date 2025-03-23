import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly StorageKey = 'users';

  public getUsers(): User[] | null {
    const data = localStorage.getItem(this.StorageKey);
    return data ? (JSON.parse(data) as User[]) : null;
  }

  public setUsers(users: User[]): void {
    const data = JSON.stringify(users);
    localStorage.setItem(this.StorageKey, data);
  }

  public removeUsers(): void {
    localStorage.removeItem(this.StorageKey);
  }
}
