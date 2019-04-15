
import { AdminActionTypes, AdminActions } from './admin.actions';
import { AdminState } from './index';

const initialState: AdminState = {
  crisisId: null,
  crisises: [],
  heroId: null,
  currentHero: null,
  heroes: [],
  error: ''
};

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
