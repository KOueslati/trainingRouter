import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserManager, User, Log, WebStorageStateStore } from 'oidc-client';
import { promise } from 'protractor';


const settings = {
  client_id: 'Crisis-api',
  authority: 'http://localhost:5000/',
  redirect_uri: 'http://localhost:4200/assets/oidc-login-redirect.html',
  post_logout_redirect_uri: 'http://localhost:4200/',
  scope: 'openid',
  client_secret: 'eLV/dtpc8sTWP2y66tnBYqDi9KOA5s477e13sg5bnwc=',
  response_type: 'id_token token',
  userStore: new WebStorageStateStore({ store: window.localStorage })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserAuthenticated = false;
  currentUser: User;
  userManager = new UserManager(settings);

  constructor() {
    Log.logger = console;
    this.userManager.getUser()
      .then(
        user => {
          if (user && !user.expired) {
            console.log('getUser :' + JSON.stringify(user));
            this.currentUser = user;
            this.isUserAuthenticated = true;
          } else {
            this.isUserAuthenticated = false;
          }
        }).catch(exception => console.log(exception));

    this.userManager.events.addUserLoaded(args => {
      this.userManager.getUser().then(user => {
        console.log('addUserLoaded :' + JSON.stringify(user));
        this.currentUser = user;
        this.isUserAuthenticated = !(user === undefined);
      });
    });
  }

  login(url?) {
    return this.userManager.signinRedirect();
  }

  logout() {
    // this.userManager.signoutRedirect();
    // this.isUserAuthenticated = false;
  }

  isUserAuthenticatedObs(): Observable<boolean> {
    const isLoggedIn = this.currentUser && this.currentUser.access_token && !this.currentUser.expired;
    return of(isLoggedIn);
  }
}
