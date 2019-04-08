import { Hero } from '../hero';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HeroesActionTypes, HeroesActions } from './heroes.actions';


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

const getCreateHeroesFeatureSelector = createFeatureSelector<HeroesState>('heroes');

export const getHeroId = createSelector(getCreateHeroesFeatureSelector,
  state => state.heroId);

export function reducer(state = initialState, action: HeroesActions): HeroesState {
  console.log(`action type ${action.type}`);
  console.log(`preloading state ${JSON.stringify(state)}`);
  switch (action.type) {
    case HeroesActionTypes.GetHeroID:
      return {
        ...state,
        heroId: action.payload
      };

    case HeroesActionTypes.SetCurrentHero:
      return {
        ...state,
        currentHero: {
          ...action.payload
        }
      };

    default:
      break;
  }
}
