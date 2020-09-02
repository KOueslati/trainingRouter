import { createReducer, on } from '@ngrx/store';
import {HeroActions} from '../index';
import { Hero } from "../hero";

export interface HeroesState {
  heroId: number;
  currentHero: Hero;
  heroes: Hero[];
}

const initialState: HeroesState = {
  heroId: null,
  currentHero: null,
  heroes: []
};

export const reducer = createReducer(
  initialState,
  on(HeroActions.getHeroId,
    ((state, {id}) => ({
      ...state,
      heroId: id
    }))),
    on(HeroActions.setCurrentHero,
      ((state, {hero}) => ({
        ...state,
        currentHero: hero
      })))
);