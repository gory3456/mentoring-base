import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { HeaderComponent } from './header/header.component';
import { authGuard } from './guards/auth.guard';
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
    title: 'client',
    canActivate: [authGuard]
  }
];
