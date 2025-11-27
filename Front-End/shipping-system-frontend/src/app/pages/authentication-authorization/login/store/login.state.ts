import { loginResponseDto } from '../dtos/loginResponseDto';

export interface LoginState {
  isAuthenticated: boolean;
  user: loginResponseDto | null;
  error: string | null;
}

export const initialLoginState: LoginState = {
  isAuthenticated: false,
  user: null,
  error: null
};
