import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    req.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    req.headers.append('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    req.headers.append('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');
    return next.handle(req);
  }
}
