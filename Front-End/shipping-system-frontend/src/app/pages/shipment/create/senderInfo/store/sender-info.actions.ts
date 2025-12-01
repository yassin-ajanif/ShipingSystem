import { createAction, props } from '@ngrx/store';
import { SenderInfoState } from './sender-info.state';
import { cityDto } from '../../../../../models/cityDto';

export const setSenderInfo = createAction(
  '[SenderInfo] Set',
  props<{ senderInfo: SenderInfoState }>()
);

export const resetSenderInfo = createAction('[SenderInfo] Reset');

export const setSenderInfoValidity = createAction(
  '[SenderInfo] Set Validity',
  props<{ isValid: boolean }>()
);

export const loadCitiesBySelectedCountryId = createAction(
  '[SenderInfo] Load cities by Selected Country Id',
  props<{ countryId: string }>()
);

export const loadCitiesBySelectedCountryIdSuccess = createAction(
  '[SenderInfo] Load cities by Selected Country Id Success',
  props<{ countryId: string; cities: cityDto[] }>() // use your own City type here
);

export const loadCitiesBySelectedCountryIdFailure = createAction(
  '[SenderInfo] Load cities by Selected Country Id Failure',
  props<{ error: string }>()
);
