import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  loadCities,
  loadCitiesFailure,
  loadCitiesSuccess,
  loadCountries,
  loadCountriesFailure,
  loadCountriesSuccess
} from './location.actions';
import { LocationService } from '../../services/location.service';

@Injectable()
export class LocationEffects {
  private actions$ = inject(Actions);
  private locationService = inject(LocationService);

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCountries),
      switchMap(() =>
        this.locationService.getCountries().pipe(
          map(response =>
            loadCountriesSuccess({ countries: response.data ?? [] })
          ),
          catchError(error =>
            of(
              loadCountriesFailure({
                error:
                  error?.error?.message ??
                  error?.message ??
                  'Failed to load countries'
              })
            )
          )
        )
      )
    )
  );

  loadCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCities),
      switchMap(({ countryId }) =>
        this.locationService.getCities(countryId).pipe(
          map(response =>
            loadCitiesSuccess({
              countryId,
              cities: response.data ?? []
            })
          ),
          catchError(error =>
            of(
              loadCitiesFailure({
                error:
                  error?.error?.message ??
                  error?.message ??
                  'Failed to load cities'
              })
            )
          )
        )
      )
    )
  );
}
