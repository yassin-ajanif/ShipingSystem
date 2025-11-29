import { createAction, props } from '@ngrx/store';
import { countryDto } from '../../pages/shipment/create/senderInfo/dtos/countryDto';
import { cityDto } from '../../pages/shipment/create/senderInfo/dtos/cityDto';

export const loadCountries = createAction('[Location] Load Countries');
export const loadCountriesSuccess = createAction(
  '[Location] Load Countries Success',
  props<{ countries: countryDto[] }>()
);
export const loadCountriesFailure = createAction(
  '[Location] Load Countries Failure',
  props<{ error: string }>()
);

export const loadCities = createAction(
  '[Location] Load Cities',
  props<{ countryId: string }>()
);
export const loadCitiesSuccess = createAction(
  '[Location] Load Cities Success',
  props<{ countryId: string; cities: cityDto[] }>()
);
export const loadCitiesFailure = createAction(
  '[Location] Load Cities Failure',
  props<{ error: string }>()
);
