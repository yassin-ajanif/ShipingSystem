import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as locationsActions from './location.actions';
import { LocationService } from '../../services/location.service';

@Injectable()
export class LocationEffects {
  private actions$ = inject(Actions);
  private locationService = inject(LocationService);

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(locationsActions.loadCountries),
      switchMap(() =>
        this.locationService.getCountries().pipe(
          map(response =>
            locationsActions.loadCountriesSuccess({ countries: response.data ?? [] })
          ),
          catchError(error =>
            of(
              locationsActions.loadCountriesFailure({
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
}
