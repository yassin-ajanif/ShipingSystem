import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CreateState } from './create.state';

export const selectCreateState = createFeatureSelector<CreateState>('create');

export const selectIsNextEnabled = createSelector(
  selectCreateState,
  state => state.isNextBtnEnabled
);
