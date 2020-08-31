import { createAction, props } from '@ngrx/store';
import { Hero } from '../hero';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
// export enum HeroesActionTypes {
//   GetHeroID = '[Heroes] GetHeroID',
//   SetCurrentHero = '[Heroes] SetCurrentHero'
// }

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
// export class GetHeroID implements Action {
//   readonly type = HeroesActionTypes.GetHeroID;

//   constructor(public payload: number) { }
// }

export const getHeroID = createAction(
  '[Heroes] GetHeroID', 
  props<{heroId: number}>());

// export class SetCurrentHero implements Action {
//   readonly type = HeroesActionTypes.SetCurrentHero;

//   constructor(public payload: Hero) { }
// }

export const setCurrentHero = createAction(
  '[Heroes] SetCurrentHero',
  props<{hero: Hero}>());

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
// export type HeroesActions
//             = GetHeroID
//             | SetCurrentHero;
