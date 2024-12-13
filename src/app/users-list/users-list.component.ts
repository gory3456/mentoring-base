import { UsersApiService } from './../users-api.service';
import {Component, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgForOf} from "@angular/common";
import {UserCardComponent} from "../user-card/user-card.component";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo : {
      lat: string;
      lng: string;
    }
  }
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    NgForOf,
    UserCardComponent,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
	readonly usersApiService = inject(UsersApiService);
	users: User[] = [];
  constructor() {
		this.usersApiService.getUsers().subscribe(
      (response:any) => {
        this.users = response;
        console.log('Users list component loaded.', this.users);
      }
    )
  }
  deleteUser(id: number) {
    this.users = this.users.filter(
      (item) => {
        return item.id !== id;
      }
    )
  }
}
