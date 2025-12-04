import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { createShipment, createShipmentFailure, createShipmentSuccess } from './create.actions';
import { ShipmentService } from '../services/shipment.service';

@Injectable()
export class CreateEffects {
  private actions$ = inject(Actions);
  private shipmentService = inject(ShipmentService);

  createShipment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createShipment),
      switchMap(({ request }) =>
        this.shipmentService.createShipment(request).pipe(
          map(response => createShipmentSuccess({ response })),
          catchError(error =>
            of(
              createShipmentFailure({
                error: error?.error?.message ?? error?.message ?? 'Failed to create shipment'
              })
            )
          )
        )
      )
    )
  );
}
