import { createReducer, on } from '@ngrx/store';
import { initialCreateState, CreateState } from './create.state';
import { setNextBtnEnabled } from './create.actions';

export const createShipmentReducer = createReducer(
  initialCreateState,
  on(setNextBtnEnabled, (state, { isNextBtnEnabled }): CreateState => ({
    ...state,
    isNextBtnEnabled
  }))
);
