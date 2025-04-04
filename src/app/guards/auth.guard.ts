import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.isAdmin.pipe(
    map(isAdmin => {
      if (isAdmin === true) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    })
  );
};
