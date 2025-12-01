import { createSelector } from '@ngrx/store';
import { CreateState } from '../../store/create.state';

const selectCreateState = (state: { create: CreateState }) => state.create;

export const selectPaymentMethodState = createSelector(
  selectCreateState,
  state => state.paymentMethod
);

export const selectPaymentMethodId = createSelector(
  selectPaymentMethodState,
  state => state.paymentMethodId
);
