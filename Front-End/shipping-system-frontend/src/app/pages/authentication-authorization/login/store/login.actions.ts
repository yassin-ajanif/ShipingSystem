import { createAction, props } from '@ngrx/store';
import { loginRequestDto } from '../dtos/loginRequestDto';
import { loginResponseDto } from '../dtos/loginResponseDto';

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
