import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserManager, User, Log, WebStorageStateStore } from 'oidc-client';
import { promise } from 'protractor';
import { ActivatedRoute, Router } from '@angular/router';


const settings = {
  client_id: 'Crisis-api',
  authority: 'http://localhost:5000/',
  // redirect_uri: 'http://localhost:4200/assets/oidc-login-redirect.html',
  redirect_uri: 'http://localhost:4200/callback-login',
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

  constructor(private router: Router) {
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
    return this.userManager.signinRedirect({ data: 'test' });
  }

  logout() {
    this.userManager.signoutRedirect();
    // this.isUserAuthenticated = false;
  }

  callbackLogin() {
    let state;
    this.userManager.signinRedirectCallback().then(
      (user) => {
        state = user.state;
        window.history.replaceState({},
          window.document.title,
          window.location.origin);
        window.location.assign('/');
      }, error => {
        console.error(error);
      }
    ).catch(ex => console.log(ex));
  }

  isUserAuthenticatedObs(): Observable<boolean> {
    const isLoggedIn = this.currentUser && this.currentUser.access_token && !this.currentUser.expired;
    return of(isLoggedIn);
  }

  redirect() {
    if (this.currentUser) {
      const path = this.currentUser.state.data || '/';
      this.router.navigate(['`${path}`']);
    }
  }
}
