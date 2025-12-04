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

export const selectShippingTypes = createSelector(
  selectPackageInfoState,
  state => state.shippingTypes
);

export const selectShippingTypesLoading = createSelector(
  selectPackageInfoState,
  state => state.shippingTypesLoading
);

export const selectShippingTypesError = createSelector(
  selectPackageInfoState,
  state => state.shippingTypesError
);
