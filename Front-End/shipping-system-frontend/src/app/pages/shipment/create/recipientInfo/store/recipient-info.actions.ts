import { createAction, props } from '@ngrx/store';
import { RecipientInfoState } from './recipient-info.state';
import { cityDto } from '../../../../../models/cityDto';

export const setRecipientInfo = createAction(
  '[RecipientInfo] Set',
  props<{ recipientInfo: RecipientInfoState }>()
);

export const resetRecipientInfo = createAction('[RecipientInfo] Reset');

export const setRecipientInfoValidity = createAction(
  '[RecipientInfo] Set Validity',
  props<{ isValid: boolean }>()
);

export const loadRecipientCitiesBySelectedCountryId = createAction(
  '[RecipientInfo] Load Cities By Selected Country Id',
  props<{ countryId: string }>()
);

export const loadRecipientCitiesBySelectedCountryIdSuccess = createAction(
  '[RecipientInfo] Load Cities By Selected Country Id Success',
  props<{ countryId: string; cities: cityDto[] }>()
);

export const loadRecipientCitiesBySelectedCountryIdFailure = createAction(
  '[RecipientInfo] Load Cities By Selected Country Id Failure',
  props<{ error: string }>()
);
