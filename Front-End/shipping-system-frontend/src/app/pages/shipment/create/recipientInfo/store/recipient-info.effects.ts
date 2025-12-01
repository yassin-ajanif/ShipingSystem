import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as recipientInfoActions from './recipient-info.actions';
import { LocationService } from '../../../../../services/location.service';

@Injectable()
export class RecipientInfoEffects {
  private actions$ = inject(Actions);
  private locationService = inject(LocationService);

  loadCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(recipientInfoActions.loadRecipientCitiesBySelectedCountryId),
      switchMap(({ countryId }) =>
        this.locationService.getCities(countryId).pipe(
          map(response =>
            recipientInfoActions.loadRecipientCitiesBySelectedCountryIdSuccess({
              countryId,
              cities: response.data ?? []
            })
          ),
          catchError(error =>
            of(
              recipientInfoActions.loadRecipientCitiesBySelectedCountryIdFailure({
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
