import { createReducer, on } from '@ngrx/store';
import { initialCreateState, CreateState } from './create.state';
import { setNextBtnEnabled, createShipment, createShipmentFailure, createShipmentSuccess, setSubscriptionPackageId } from './create.actions';
import * as senderInfoActions from '../senderInfo/store/sender-info.actions';
import * as recipientInfoActions from '../recipientInfo/store/recipient-info.actions';
import { senderInfoReducer } from '../senderInfo/store/sender-info.reducer';
import { recipientInfoReducer } from '../recipientInfo/store/recipient-info.reducer';
import * as packageInfoActions from '../packageDetails/store/package-info.actions';
import { packageInfoReducer } from '../packageDetails/store/package-info.reducer';

export const createShipmentReducer = createReducer(
  initialCreateState,
  on(setNextBtnEnabled, (state, { isNextBtnEnabled }): CreateState => ({
    ...state,
    isNextBtnEnabled
  })),

  on(createShipment, (state): CreateState => ({
    ...state,
    createShipmentLoading: true,
    createShipmentError: null
  })),

  on(createShipmentSuccess, (state): CreateState => ({
    ...state,
    createShipmentLoading: false,
    createShipmentError: null
  })),

  on(createShipmentFailure, (state, { error }): CreateState => ({
    ...state,
    createShipmentLoading: false,
    createShipmentError: error
  })),

  on(setSubscriptionPackageId, (state, { subscriptionPackageId }): CreateState => ({
    ...state,
    subscriptionPackageId
  })),

  on(
    // we convert the actions object to an array of actions instead of listing them one by one
    ...Object.values(senderInfoActions),
    (state, action): CreateState => ({
      ...state,
      senderInfo: senderInfoReducer(state.senderInfo, action)
    })
  ),

  on(
    ...Object.values(recipientInfoActions),
    (state, action): CreateState => ({
      ...state,
      recipientInfo: recipientInfoReducer(state.recipientInfo, action)
    })
  ),

  on(
    ...Object.values(packageInfoActions),
    (state, action): CreateState => ({
      ...state,
      packageInfo: packageInfoReducer(state.packageInfo, action)
    })
  )
);
