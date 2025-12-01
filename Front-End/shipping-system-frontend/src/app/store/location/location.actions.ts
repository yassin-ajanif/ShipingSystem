import { createAction, props } from '@ngrx/store';
import { countryDto } from '../../models/countryDto';
import { cityDto } from '../../models/cityDto';

export const loadCountries = createAction('[Location] Load Countries');
export const loadCountriesSuccess = createAction(
  '[Location] Load Countries Success',
  props<{ countries: countryDto[] }>()
);
export const loadCountriesFailure = createAction(
  '[Location] Load Countries Failure',
  props<{ error: string }>()
);


