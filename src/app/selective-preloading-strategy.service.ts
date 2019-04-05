import { Injectable } from '@angular/core';
import { PreloadingStrategy } from '@angular/router';
import { Route } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectivePreloadingStrategyService implements PreloadingStrategy {
  preloadedModules: string[] = [];
  constructor() { }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // tslint:disable-next-line: no-string-literal
    if (route.data && route.data['preload']) {
      // add the route path to the preloaded module array
      this.preloadedModules.push(route.path);

      // log the route path to the console
      console.log('Preload Module: ' + route.path);
      return load();
    } else {
      return of(null);
    }
  }
}
