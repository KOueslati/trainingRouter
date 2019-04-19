import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild, CanLoad, Route } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.checkLogin(state.url);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(next, state);
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    const url = route.path ? route.path : '';

    return this.checkLogin(url);
  }

  checkLogin(url: string) {
    const isLoggedIn$ = this.authService.isUserAuthenticatedObs();
    isLoggedIn$.subscribe((loggedIn => {
      if (!loggedIn) {
        this.router.navigate(['login', { redirectUrl: url }]);
      }
    }));

    return isLoggedIn$;
  }
}
