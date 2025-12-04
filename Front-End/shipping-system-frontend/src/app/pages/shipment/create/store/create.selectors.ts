import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CreateState } from './create.state';

export const selectCreateState = createFeatureSelector<CreateState>('create');

export const selectIsNextEnabled = createSelector(
  selectCreateState,
  state => state.isNextBtnEnabled
);

export const selectRecipientInfoState = createSelector(
  selectCreateState,
  state => state.recipientInfo
);

export const selectRecipientInfoValid = createSelector(
  selectRecipientInfoState,
  state => state.isValid
);

export const selectPackageInfoState = createSelector(
  selectCreateState,
  state => state.packageInfo
);

export const selectPackageInfoValid = createSelector(
  selectPackageInfoState,
  state => state.isValid
);

export const selectPaymentMethodState = createSelector(
  selectCreateState,
  state => state.paymentMethod
);

export const selectPaymentMethodId = createSelector(
  selectPaymentMethodState,
  state => state.paymentMethodId
);

export const selectCreateShipmentLoading = createSelector(
  selectCreateState,
  state => state.createShipmentLoading
);

export const selectCreateShipmentError = createSelector(
  selectCreateState,
  state => state.createShipmentError
);
