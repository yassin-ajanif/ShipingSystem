import { createReducer, on } from '@ngrx/store';
import { initialCreateState, CreateState } from './create.state';
import { setNextBtnEnabled } from './create.actions';
import * as senderInfoActions from '../senderInfo/store/sender-info.actions';
import * as recipientInfoActions from '../recipientInfo/store/recipient-info.actions';
import { senderInfoReducer } from '../senderInfo/store/sender-info.reducer';
import { recipientInfoReducer } from '../recipientInfo/store/recipient-info.reducer';

export const createShipmentReducer = createReducer(
  initialCreateState,
  on(setNextBtnEnabled, (state, { isNextBtnEnabled }): CreateState => ({
    ...state,
    isNextBtnEnabled
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
  )
);
