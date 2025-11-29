import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SenderInfoState } from './sender-info.state';

export const selectSenderInfoState =
  createFeatureSelector<SenderInfoState>('senderInfo');

export const selectSenderInfo = createSelector(
  selectSenderInfoState,
  state => state
);

export const selectSenderCountryId = createSelector(
  selectSenderInfoState,
  state => state.countryId
);

export const selectSenderCityId = createSelector(
  selectSenderInfoState,
  state => state.cityId
);

export const selectSenderInfoValid = createSelector(
  selectSenderInfoState,
  state => state.isValid
);
