import { createAction, props } from '@ngrx/store';
import { SenderInfoState } from './sender-info.state';

export const setSenderInfo = createAction(
  '[SenderInfo] Set',
  props<{ senderInfo: SenderInfoState }>()
);

export const resetSenderInfo = createAction('[SenderInfo] Reset');

export const setSenderInfoValidity = createAction(
  '[SenderInfo] Set Validity',
  props<{ isValid: boolean }>()
);
