import { Crisis } from 'src/app/crisis-center/crisis';
import { Hero } from 'src/app/heroes/hero';
import { AdminActions, AdminActionTypes } from './admin.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface AdminState {
  crisisId: number;
  currentCrisis: Crisis;
  crisises: Crisis[];
  heroId: number;
  currentHero: Hero;
  heroes: Hero[];
  error: string;
}

const initialState: AdminState = {
  crisisId: null,
  currentCrisis: null,
  crisises: [],
  heroId: null,
  currentHero: null,
  heroes: [],
  error: ''
};

const adminFeatureSelector = createFeatureSelector<AdminState>('admin');

export const getCrisises = createSelector(adminFeatureSelector,
  state => state.crisises);

export const getCurrentCrisis = createSelector(adminFeatureSelector,
  state => state.currentCrisis);

export const getCrisisId = createSelector(adminFeatureSelector,
  state => state.crisisId);

export const getError = createSelector(adminFeatureSelector,
  state => state.error);

export function reducer(state = initialState, action: AdminActions): AdminState {
  switch (action.type) {
    case AdminActionTypes.LoadCrisisesSuccess: {
      return {
        ...state,
        crisises: action.payload
      };
    }

    case AdminActionTypes.LoadCrisisesFailed: {
      return {
        ...state,
        crisises: [],
        error: action.payload
      };
    }

    case AdminActionTypes.SetCurrentCrisis: {
      return {
        ...state,
        currentCrisis: action.payload
      };
    }

    case AdminActionTypes.SetCurrentCrisisId: {
      return {
        ...state,
        crisisId: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
