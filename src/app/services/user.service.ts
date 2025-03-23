import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IUser {
  name: string;
  email: string;
  isAdmin: boolean | null;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userSubject$ = new BehaviorSubject<IUser | null>(null);
  public readonly user$ = this.userSubject$.asObservable();

  private readonly user: IUser = {
    name: 'Ильнур',
    email: 'user@gmail.com',
    isAdmin: null
  };

  public loginAsAdmin(): void {
    this.userSubject$.next({ ...this.user, isAdmin: true });
  }

  public loginAsUser(): void {
    this.userSubject$.next({ ...this.user, isAdmin: false });
  }

  public get isAdmin() {
    return this.userSubject$.value?.isAdmin;
  }

  public logout(): void {
    this.userSubject$.next(null);
  }
}
