import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoadingState } from './loading.state';

export const selectLoadingState = createFeatureSelector<LoadingState>('ui');

export const IsLoading = createSelector(
  selectLoadingState,
  state => state.isLoading
);
