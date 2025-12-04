import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  loadShippingTypes,
  loadShippingTypesFailure,
  loadShippingTypesSuccess
} from './package-info.actions';
import { ShippingTypeService } from '../../../../../services/shipping-type.service';
import { shippingTypeDto } from '../../../../../models/shippingTypeDto';

@Injectable()
export class PackageInfoEffects {
  private actions$ = inject(Actions);
  private shippingTypeService = inject(ShippingTypeService);

  loadShippingTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadShippingTypes),
      switchMap(() =>
        this.shippingTypeService.getShippingTypes().pipe(
          map(response => loadShippingTypesSuccess({ shippingTypes: response.data as shippingTypeDto[] })),
          catchError(error =>
            of(
              loadShippingTypesFailure({
                error: error?.error?.message ?? error?.message ?? 'Failed to load shipping types'
              })
            )
          )
        )
      )
    )
  );
}
