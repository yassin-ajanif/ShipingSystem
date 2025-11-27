import { createReducer, on } from '@ngrx/store';
import { LoginState, initialLoginState } from './login.state';
import * as LoginActions from './login.actions';

export const loginReducer = createReducer(
  initialLoginState,
  
  on(LoginActions.login, (state): LoginState => ({
    ...state,
    error: null
  })),
  
  on(LoginActions.loginSuccess, (state, { user }): LoginState => ({
    ...state,
    isAuthenticated: true,
    user,
    error: null
  })),
  
  on(LoginActions.loginFailure, (state, { error }): LoginState => ({
    ...state,
    error,
    isAuthenticated: false,
    user: null
  })),
  
  on(LoginActions.logout, (state): LoginState => ({
    ...state,
    error: null
  })),
  
  on(LoginActions.logoutSuccess, (state): LoginState => ({
    ...state,
    isAuthenticated: false,
    user: null,
    error: null
  }))
);
