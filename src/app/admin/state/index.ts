
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Crisis } from 'src/app/crisis-center/crisis';
import { Hero } from 'src/app/heroes/hero';

export interface AdminState {
  crisisId: number | null;
  crisises: Crisis[];
  heroId: number;
  currentHero: Hero;
  heroes: Hero[];
  error: string;
}


const adminFeatureSelector = createFeatureSelector<AdminState>('admin');

export const getCrisises = createSelector(adminFeatureSelector,
  // tslint:disable-next-line: no-shadowed-variable
  state => state.crisises);

export const getCrisisId = createSelector(adminFeatureSelector,
  // tslint:disable-next-line: no-shadowed-variable
  state => state.crisisId);

export const getCurrentCrisis = createSelector(adminFeatureSelector,
  getCrisisId,
  // tslint:disable-next-line: no-shadowed-variable
  (state: AdminState, crisisId) => crisisId !== null ? state.crisises.find(c => c.id === crisisId) : null);

export const getError = createSelector(adminFeatureSelector,
  // tslint:disable-next-line: no-shadowed-variable
  state => state.error);
