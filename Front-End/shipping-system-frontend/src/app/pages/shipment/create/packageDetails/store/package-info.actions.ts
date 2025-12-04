import { createAction, props } from '@ngrx/store';
import { PackageInfoState } from './package-info.state';
import { shippingTypeDto } from '../../../../../models/shippingTypeDto';

export const setPackageInfo = createAction(
  '[PackageInfo] Set',
  props<{ packageInfo: PackageInfoState }>()
);

export const resetPackageInfo = createAction('[PackageInfo] Reset');

export const setPackageInfoValidity = createAction(
  '[PackageInfo] Set Validity',
  props<{ isValid: boolean }>()
);

export const loadShippingTypes = createAction('[PackageInfo] Load Shipping Types');

export const loadShippingTypesSuccess = createAction(
  '[PackageInfo] Load Shipping Types Success',
  props<{ shippingTypes: shippingTypeDto[] }>()
);

export const loadShippingTypesFailure = createAction(
  '[PackageInfo] Load Shipping Types Failure',
  props<{ error: string }>()
);
