import { createAction, props } from '@ngrx/store';
import { loginRequestDto } from '../dtos/loginRequestDto';
import { loginResponseDto } from '../dtos/loginResponseDto';
import { userSubscriptionDetailsDto } from '../dtos/userSubscriptionDetailsDto';

export const login = createAction(
  '[Login] Login',
  props<{ credentials: loginRequestDto }>()
);

export const loginSuccess = createAction(
  '[Login] Login Success',
  props<{ user: loginResponseDto }>()
);

export const loginFailure = createAction(
  '[Login] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction(
  '[Login] Logout'
);

export const logoutSuccess = createAction(
  '[Login] Logout Success'
);

export const loadUserSubscription = createAction(
  '[Login] Load User Subscription',
  props<{ userId: string }>()
);

export const loadUserSubscriptionSuccess = createAction(
  '[Login] Load User Subscription Success',
  props<{ subscription: userSubscriptionDetailsDto | null }>()
);

export const loadUserSubscriptionFailure = createAction(
  '[Login] Load User Subscription Failure',
  props<{ error: string }>()
);
