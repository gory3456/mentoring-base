import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isAdmin === true) {
    return true;
  } else if (userService.isAdmin === false) {
    router.navigate(['/']);
    return false;
  } else {
    return false;
  }
};
