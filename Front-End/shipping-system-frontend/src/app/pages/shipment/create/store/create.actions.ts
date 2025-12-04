import { createAction, props } from '@ngrx/store';
import { CreateShippingRequestDto } from '../dtos/create-shipping-request.dto';

export const setNextBtnEnabled = createAction(
  '[Create] Set Next Enabled',
  props<{ isNextBtnEnabled: boolean }>()
);

export const createShipment = createAction(
  '[Create] Create Shipment',
  props<{ request: CreateShippingRequestDto }>()
);

export const createShipmentSuccess = createAction(
  '[Create] Create Shipment Success',
  props<{ response: any }>()
);

export const createShipmentFailure = createAction(
  '[Create] Create Shipment Failure',
  props<{ error: string }>()
);

export const setSubscriptionPackageId = createAction(
  '[Create] Set Subscription Package Id',
  props<{ subscriptionPackageId: string | null }>()
);
