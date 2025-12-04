import { createReducer, on } from '@ngrx/store';
import { LoginState, initialLoginState } from './login.state';
import * as LoginActions from './login.actions';

export const loginReducer = createReducer(
  initialLoginState,
  
  on(LoginActions.login, (state): LoginState => ({
    ...state,
    subscriptionDetails: null,
    subscriptionLoading: false,
    subscriptionError: null,
    error: null
  })),
  
  on(LoginActions.loginSuccess, (state, { user }): LoginState => ({
    ...state,
    isAuthenticated: true,
    user,
    subscriptionDetails: null,
    subscriptionLoading: false,
    subscriptionError: null,
    error: null
  })),
  
  on(LoginActions.loginFailure, (state, { error }): LoginState => ({
    ...state,
    error,
    isAuthenticated: false,
    user: null,
    subscriptionDetails: null,
    subscriptionLoading: false,
    subscriptionError: null
  })),
  
  on(LoginActions.logout, (state): LoginState => ({
    ...state,
    error: null
  })),
  
  on(LoginActions.logoutSuccess, (state): LoginState => ({
    ...state,
    isAuthenticated: false,
    user: null,
    subscriptionDetails: null,
    subscriptionLoading: false,
    subscriptionError: null,
    error: null
  })),

  on(LoginActions.loadUserSubscription, (state): LoginState => ({
    ...state,
    subscriptionLoading: true,
    subscriptionError: null
  })),

  on(LoginActions.loadUserSubscriptionSuccess, (state, { subscription }): LoginState => ({
    ...state,
    subscriptionDetails: subscription,
    subscriptionLoading: false,
    subscriptionError: null
  })),

  on(LoginActions.loadUserSubscriptionFailure, (state, { error }): LoginState => ({
    ...state,
    subscriptionDetails: null,
    subscriptionLoading: false,
    subscriptionError: error
  }))
);
