import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-callback-login',
  template: ``,
  styles: []
})
export class CallbackLoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.callbackLogin();
    this.authService.redirect();
  }

}
