import { createSelector } from '@ngrx/store';
import { CreateState } from '../../store/create.state';

const selectCreateState = (state: { create: CreateState }) => state.create;

export const selectPackageInfoState = createSelector(
  selectCreateState,
  (state) => state.packageInfo
);

export const selectPackageInfoValid = createSelector(
  selectPackageInfoState,
  (state) => state.isValid
);
