import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromHeroes from "./heroes.reducer";

export const heroesFeatureKey = 'heroes';

export interface State  {
    [heroesFeatureKey]: fromHeroes.HeroesState;
}

export const selectHero = createFeatureSelector<State, fromHeroes.HeroesState>(heroesFeatureKey);

export const selectHeroId = createSelector(
    selectHero,
    (state) => state.heroId
);


  