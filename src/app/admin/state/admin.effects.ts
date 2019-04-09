import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import * as adminActions from './admin.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { CrisisService } from 'src/app/crisis-center/crisis.service';

@Injectable()

export class AdminEffects {

  constructor(private actions$: Actions, private crisisesService: CrisisService) { }

  @Effect()
  loadCrisises$ = this.actions$.pipe(
    ofType(adminActions.AdminActionTypes.LoadCrisises),
    mergeMap(action => this.crisisesService.getCrises().
    pipe(map(crisies => new adminActions.LoadCrisisesSuccess(crisies)),
    catchError(err => of(new adminActions.LoadCrisisesFailed(err))))));
}
