import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as senderInfoActions from './sender-info.actions';
import { LocationService } from '../../../../../services/location.service';

@Injectable()
export class SenderInfoEffects {
  private actions$ = inject(Actions);
  private locationService = inject(LocationService);

  loadCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(senderInfoActions.loadCitiesBySelectedCountryId),
      switchMap(({ countryId }) =>
        this.locationService.getCities(countryId).pipe(
          map(response =>
            senderInfoActions.loadCitiesBySelectedCountryIdSuccess({
              countryId,
              cities: response.data ?? []
            })
          ),
          catchError(error =>
            of(
              senderInfoActions.loadCitiesBySelectedCountryIdFailure({
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
