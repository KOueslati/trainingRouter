import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, timeInterval } from 'rxjs/operators';
import { delay } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserAuthenticated = false;


  constructor() { }

  login(): Observable<boolean> {
    return of(true).pipe(
      tap(_ => this.isUserAuthenticated = true)
    );
  }

  logout() {
    this.isUserAuthenticated = false;
  }
}
