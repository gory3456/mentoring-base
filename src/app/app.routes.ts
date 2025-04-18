import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
    title: 'Users'
  },
  {
    path: '',
    component: HomeComponent,
    title: 'home'
  },
  {
    path: 'client',
    component: ClientComponent,
    title: 'client'
  }
];
