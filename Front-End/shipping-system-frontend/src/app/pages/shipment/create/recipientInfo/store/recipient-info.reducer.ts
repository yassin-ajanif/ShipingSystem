import { createReducer, on } from '@ngrx/store';
import { initialRecipientInfoState, RecipientInfoState } from './recipient-info.state';
import {
  loadRecipientCitiesBySelectedCountryId,
  loadRecipientCitiesBySelectedCountryIdFailure,
  loadRecipientCitiesBySelectedCountryIdSuccess,
  resetRecipientInfo,
  setRecipientInfo,
  setRecipientInfoValidity
} from './recipient-info.actions';

export const recipientInfoReducer = createReducer(
  initialRecipientInfoState,

  on(setRecipientInfo, (_state, { recipientInfo }): RecipientInfoState => ({
    ..._state,
    ...recipientInfo
  })),

  on(setRecipientInfoValidity, (state, { isValid }): RecipientInfoState => ({
    ...state,
    isValid
  })),

  on(resetRecipientInfo, (): RecipientInfoState => initialRecipientInfoState),

  on(loadRecipientCitiesBySelectedCountryId, (state, { countryId }): RecipientInfoState => ({
    ...state,
    countryId,
    citiesByLoadedByCountryId: []
  })),

  on(loadRecipientCitiesBySelectedCountryIdSuccess, (state, { countryId, cities }): RecipientInfoState => ({
    ...state,
    countryId,
    citiesByLoadedByCountryId: cities
  })),

  on(loadRecipientCitiesBySelectedCountryIdFailure, (state): RecipientInfoState => ({
    ...state,
    citiesByLoadedByCountryId: []
  }))
);
