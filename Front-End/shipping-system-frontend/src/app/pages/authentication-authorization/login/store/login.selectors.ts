import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { LoginState } from './login.state';

export const selectLoginState = createFeatureSelector<LoginState>('login');

export const IsAuthenticated = createSelector(
  selectLoginState,
  (state: LoginState) => state.isAuthenticated
);

export const IsError = createSelector(
  selectLoginState,
  (state: LoginState) => state.error
);

export const IsLoggedOut = createSelector(
  selectLoginState,
  (state: LoginState) => !state.isAuthenticated
);
