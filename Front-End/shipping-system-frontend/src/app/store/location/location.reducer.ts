import { createReducer, on } from '@ngrx/store';
import { initialLocationState, LocationState } from './location.state';
import * as locationActions from './location.actions';

export const locationReducer = createReducer(
  initialLocationState,
  on(locationActions.loadCountries, (state): LocationState => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(locationActions.loadCountriesSuccess, (state, { countries }): LocationState => ({
    ...state,
    loading: false,
    countries
  })),

  on(locationActions.loadCountriesFailure, (state, { error }): LocationState => ({
    ...state,
    loading: false,
    error
  })),

);
