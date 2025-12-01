import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LocationState } from './location.state';

export const selectLocationState =
  createFeatureSelector<LocationState>('location');

export const selectCountries = createSelector(
  selectLocationState,
  state => state.countries
);



export const selectCurrentCountryId = createSelector(
  selectLocationState,
  state => state.currentCountryId
);

export const selectLocationLoading = createSelector(
  selectLocationState,
  state => state.loading
);

export const selectLocationError = createSelector(
  selectLocationState,
  state => state.error
);
