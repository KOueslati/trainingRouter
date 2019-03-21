import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  redirectUrl: string;
  message: string;
  constructor(private route: ActivatedRoute, private router: Router, public authService: AuthService) {
    this.message = `User is logged : ${authService.isUserAuthenticated ? 'in' : 'out'}`;
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => this.redirectUrl = params.get('redirectUrl'))
    );
  }

  setMessage(message: string) {
    this.message = message;
  }

  async login() {
    this.setMessage('try to login...');
    if (this.authService.isUserAuthenticated) {
      this.router.navigate([this.redirectUrl ? this.redirectUrl : '\admin']);
    }
// tslint:disable-next-line: no-shadowed-variable
    const promise = new Promise((resolve, reject) =>
      this.authService.login()
        .toPromise()
        .then(
          () => {
            this.router.navigate([this.redirectUrl ? this.redirectUrl : '\admin']);
            resolve();
          },
          err => {
            console.log(err);
            reject(err);
          }
        ));
    await promise;
  }

  logout() {
    this.setMessage('try to login...');
    this.authService.logout();
  }

}
