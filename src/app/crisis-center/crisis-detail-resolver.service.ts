import { Injectable } from '@angular/core';
import { CrisisService } from './crisis.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ParamMap, ActivatedRoute, Router } from '@angular/router';
import { Crisis } from './crisis';
import { Observable, of, observable, empty } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class CrisisDetailResolverService implements Resolve<Crisis> {
  constructor(private crisisService: CrisisService, private route: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Crisis | Observable<Crisis> | Promise<Crisis> | Observable<never> {
    const idCrisis = route.paramMap.get('id');
    return this.crisisService.getCrisis(idCrisis).pipe(
      take(1),
      mergeMap(crisis => {
      // tslint:disable-next-line: curly
          if (crisis) return of(crisis);
          this.route.navigate(['crisis-center']);
      // tslint:disable-next-line: deprecation
          return empty();
        })
    );
    }
}
