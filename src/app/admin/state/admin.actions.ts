import { Action } from '@ngrx/store';
import { Crisis } from 'src/app/crisis-center/crisis';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum AdminActionTypes {
  LoadCrisises = '[Admin] Load Crisises',
  LoadCrisisesSuccess = '[Admin] Load Crisises Success',
  LoadCrisisesFailed = '[Admin] Load Crisises Failed',
  SetCurrentCrisis = '[Admin] Set Current Crisis',
  SetCurrentCrisisFailed = '[Admin] Set Current Crisis Failed',
  SetCurrentCrisisId = '[Admin] Set Current Crisis Identifier',
  UpdateCrisis = '[Admin] Update Crisis',
  UpdateCrisisSuccess = '[Admin] Update Crisis Success',
  UpdateCrisisFailed = '[Admin] Update Crisis Failed'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadCrisises implements Action {
  readonly type = AdminActionTypes.LoadCrisises;
}

export class LoadCrisisesSuccess implements Action {
  readonly type = AdminActionTypes.LoadCrisisesSuccess;

  constructor(public payload: Crisis[]) { }
}

export class LoadCrisisesFailed implements Action {
  readonly type = AdminActionTypes.LoadCrisisesFailed;
  constructor(public payload: string) { }
}

export class SetCurrentCrisis implements Action {
  readonly type = AdminActionTypes.SetCurrentCrisis;

  constructor(public payload: Crisis) { }
}

export class SetCurrentCrisisFailed implements Action {
  readonly type = AdminActionTypes.SetCurrentCrisisFailed;

  constructor(public payload: string) { }
}


export class SetCurrentCrisisId implements Action {
  readonly type = AdminActionTypes.SetCurrentCrisisId;

  constructor(public payload: number) { }
}

export class UpdateCrisis implements Action {
  readonly type = AdminActionTypes.UpdateCrisis;

  constructor(public payload: Crisis) { }
}

export class UpdateCrisisSuccess implements Action {
  readonly type = AdminActionTypes.UpdateCrisisSuccess;

  constructor(public payload: Crisis) { }
}

export class UpdateCrisisFailed implements Action {
  readonly type = AdminActionTypes.UpdateCrisisFailed;

  constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type AdminActions
  = LoadCrisises
  | LoadCrisisesSuccess
  | LoadCrisisesFailed
  | SetCurrentCrisis
  | SetCurrentCrisisFailed
  | SetCurrentCrisisId
  | UpdateCrisis
  | UpdateCrisisSuccess
  | UpdateCrisisFailed;


