import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  private readonly apiService = inject(HttpClient);

  public getUsers(): Observable<User[]> {
    return this.apiService.get<User[]>('http://jsonplaceholder.typicode.com/users');
  }
}
