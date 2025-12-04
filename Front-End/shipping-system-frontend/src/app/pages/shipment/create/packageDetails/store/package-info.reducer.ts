import { createReducer, on } from '@ngrx/store';
import { initialPackageInfoState, PackageInfoState } from './package-info.state';
import {
  loadShippingTypes,
  loadShippingTypesFailure,
  loadShippingTypesSuccess,
  resetPackageInfo,
  setPackageInfo,
  setPackageInfoValidity
} from './package-info.actions';

export const packageInfoReducer = createReducer(
  initialPackageInfoState,
  on(setPackageInfo, (state, { packageInfo }): PackageInfoState => ({
    ...state,
    ...packageInfo
  })),
  on(setPackageInfoValidity, (state, { isValid }): PackageInfoState => ({
    ...state,
    isValid
  })),
  on(loadShippingTypes, (state): PackageInfoState => ({
    ...state,
    shippingTypesLoading: true,
    shippingTypesError: null
  })),
  on(loadShippingTypesSuccess, (state, { shippingTypes }): PackageInfoState => ({
    ...state,
    shippingTypes,
    shippingTypesLoading: false
  })),
  on(loadShippingTypesFailure, (state, { error }): PackageInfoState => ({
    ...state,
    shippingTypesLoading: false,
    shippingTypesError: error
  })),
  on(resetPackageInfo, (): PackageInfoState => initialPackageInfoState)
);
