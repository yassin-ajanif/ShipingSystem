import { createReducer, on } from '@ngrx/store';
import { initialSenderInfoState, SenderInfoState } from './sender-info.state';
import {
  loadCitiesBySelectedCountryId,
  loadCitiesBySelectedCountryIdFailure,
  loadCitiesBySelectedCountryIdSuccess,
  resetSenderInfo,
  setSenderInfo,
  setSenderInfoValidity
} from './sender-info.actions';

export const senderInfoReducer = createReducer(
  initialSenderInfoState,
  
on(setSenderInfo, (_state, { senderInfo }): SenderInfoState => ({
  
    ..._state,
    ...senderInfo
}))
,


  on(setSenderInfoValidity, (state, { isValid }): SenderInfoState => ({
    ...state,
    isValid
  })),

  on(resetSenderInfo, (): SenderInfoState => initialSenderInfoState),

  on(loadCitiesBySelectedCountryId, (_state, { countryId }): SenderInfoState => ({
    ..._state,
    countryId,
    citiesLoading: true,
    citiesError: null
  })),

  on(loadCitiesBySelectedCountryIdSuccess, (_state, { countryId, cities }): SenderInfoState => ({
    ..._state,
    countryId,
    citiesByLoadedByCountryId: cities,
    citiesLoading: false,
    citiesError: null
  })),

  on(loadCitiesBySelectedCountryIdFailure, (_state, { error }): SenderInfoState => ({
    ..._state,
    citiesLoading: false,
    citiesError: error
  })),


);
