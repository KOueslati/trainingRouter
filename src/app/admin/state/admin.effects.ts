import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, pipe } from 'rxjs';
import * as adminActions from './admin.actions';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { CrisisService } from 'src/app/crisis-center/crisis.service';
import { Store, select, Action } from '@ngrx/store';
import * as adminState from './admin.reducer';
import { Crisis } from 'src/app/crisis-center/crisis';

@Injectable()

export class AdminEffects {

  constructor(private actions$: Actions, private crisisesService: CrisisService, private store: Store<adminState.AdminState>) { }

  @Effect()
  loadCrisises$ = this.actions$.pipe(
    ofType(adminActions.AdminActionTypes.LoadCrisises),
    mergeMap(action => this.crisisesService.getCrises().
      pipe(map(crisies => new adminActions.LoadCrisisesSuccess(crisies)),
        catchError(err => of(new adminActions.LoadCrisisesFailed(err))))));

  @Effect()
  getCrisis$ = this.actions$.pipe(
    ofType(adminActions.AdminActionTypes.SetCurrentCrisisId),
    map((action: adminActions.SetCurrentCrisisId) => action.payload),
    mergeMap((id: number) => this.crisisesService.getCrisis(id).pipe(
      map((crisis: Crisis) => new adminActions.SetCurrentCrisis(crisis)),
      catchError((err) => of(new adminActions.SetCurrentCrisisFailed(err))))));

  @Effect()
  updateCrisis$: Observable<Action> = this.actions$.pipe(
    ofType(adminActions.AdminActionTypes.UpdateCrisis),
    map((action: adminActions.UpdateCrisis) => action.payload),
    mergeMap(crisis => this.crisisesService.createOrUpdateCrisis(crisis).pipe(
      map(item => new adminActions.UpdateCrisisSuccess(item)),
      catchError((err) => {
        console.log(err);
        return of(new adminActions.UpdateCrisisFailed(err));
      }))));
}
