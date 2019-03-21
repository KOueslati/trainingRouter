import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      console.log('CanActivate using guard call');

      const url = state.url;
      // tslint:disable-next-line: curly
      if (this.authService.isUserAuthenticated) return true;

      this.router.navigate(['login', { redirectUrl: url }]);

      return false;
  }
}
