import { Hero } from '../hero';
import { createFeatureSelector, createSelector, createReducer } from '@ngrx/store';
import { on } from 'process';
import { HeroActions } from '../index';

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

// export function reducer(state = initialState, 
//   action: HeroesActions): HeroesState {
//   console.log(`action type ${action.type}`);
//   console.log(`preloading state ${JSON.stringify(state)}`);
//   switch (action.type) {
//     case HeroesActionTypes.GetHeroID:
//       return {
//         ...state,
//         heroId: action.payload
//       };

//     case HeroesActionTypes.SetCurrentHero:
//       return {
//         ...state,
//         currentHero: {
//           ...action.payload
//         }
//       };

//     default:
//       break;
//   }
// }

// export const reducer = createReducer(initialState,
//   on(HeroActions.getHeroID, (state, { heroId }) => ({
//     ...state,
//     heroId : heroId
//   })),
//   on(HeroActions.setCurrentHero,
//     ((state, {hero})=> ({
//       ...state,
//       currentHero: hero
//     }))));
