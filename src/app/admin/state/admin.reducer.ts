import { Crisis } from 'src/app/crisis-center/crisis';
import { Hero } from 'src/app/heroes/hero';
import { AdminActionTypes, AdminActions } from './admin.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { state } from '@angular/animations';

export interface AdminState {
  crisisId: number | null;
  crisises: Crisis[];
  heroId: number;
  currentHero: Hero;
  heroes: Hero[];
  error: string;
}

const initialState: AdminState = {
  crisisId: null,
  crisises: [],
  heroId: null,
  currentHero: null,
  heroes: [],
  error: ''
};

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

// tslint:disable-next-line: no-shadowed-variable
export function reducer(state = initialState, action: AdminActions): AdminState {
  switch (action.type) {
    case AdminActionTypes.LoadCrisisesSuccess: {
      return {
        ...state,
        crisises: action.payload
      };
    }

    case AdminActionTypes.LoadCrisisesFailed:
      {
        return {
          ...state,
          crisises: [],
          error: action.payload
        };
      }

    case AdminActionTypes.SetCurrentCrisis: {
      return {
        ...state,
        crisisId: action.payload.id
      };
    }

    case AdminActionTypes.SetCurrentCrisisId: {
      return {
        ...state,
        crisisId: action.payload
      };
    }

    case AdminActionTypes.SetCurrentCrisisFailed: {
      return {
        ...state,
        error: action.payload
      };
    }

    case AdminActionTypes.UpdateCrisis: {
      return {
        ...state,
        crisisId: action.payload.id
      };
    }

    case AdminActionTypes.UpdateCrisisSuccess: {
      return {
        ...state,
        crisisId: action.payload.id,
        crisises: state.crisises.map(item => action.payload.id === item.id ? action.payload : item)
      };
    }

    case AdminActionTypes.UpdateCrisisFailed: {
      return {
        ...state,
        error: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
