import { createAction, props } from '@ngrx/store';

export const setNextBtnEnabled = createAction(
  '[Create] Set Next Enabled',
  props<{ isNextBtnEnabled: boolean }>()
);
