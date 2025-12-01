import { createAction, props } from '@ngrx/store';

export const setPaymentMethodId = createAction(
  '[PaymentMethod] Set Payment Method Id',
  props<{ paymentMethodId: string }>()
);
