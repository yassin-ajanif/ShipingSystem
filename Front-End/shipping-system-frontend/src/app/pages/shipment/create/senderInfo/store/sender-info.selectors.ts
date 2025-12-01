import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SenderInfoState } from './sender-info.state';
import { CreateState } from '../../store/create.state';
import * as locationSelectors from '../../../../../store/location/location.selectors';
import { cityDto } from '../../../../../models/cityDto';

const selectCreateState = createFeatureSelector<CreateState>('create');

export const selectSenderInfoState = createSelector(
  selectCreateState,
  (state): SenderInfoState => state.senderInfo
);

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

export const selectCitiesBySelectedCountry = createSelector(
  selectSenderInfoState,
  state => state.citiesByLoadedByCountryId
  
);
