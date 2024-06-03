import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn: boolean = inject(AuthService).isLoggedIn();

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
