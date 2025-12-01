import { createAction, props } from '@ngrx/store';
import { PackageInfoState } from './package-info.state';

export const setPackageInfo = createAction(
  '[PackageInfo] Set',
  props<{ packageInfo: PackageInfoState }>()
);

export const resetPackageInfo = createAction('[PackageInfo] Reset');

export const setPackageInfoValidity = createAction(
  '[PackageInfo] Set Validity',
  props<{ isValid: boolean }>()
);
