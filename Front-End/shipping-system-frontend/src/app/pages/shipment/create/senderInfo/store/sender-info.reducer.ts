import { createReducer, on } from '@ngrx/store';
import { initialSenderInfoState, SenderInfoState } from './sender-info.state';
import { resetSenderInfo, setSenderInfo, setSenderInfoValidity } from './sender-info.actions';

export const senderInfoReducer = createReducer(
  initialSenderInfoState,
  on(setSenderInfo, (_state, { senderInfo }): SenderInfoState => ({
    ...senderInfo
  })),
  on(setSenderInfoValidity, (state, { isValid }): SenderInfoState => ({
    ...state,
    isValid
  })),
  on(resetSenderInfo, (): SenderInfoState => initialSenderInfoState)
);
