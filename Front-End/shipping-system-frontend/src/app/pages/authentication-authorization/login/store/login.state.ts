import { loginResponseDto } from '../dtos/loginResponseDto';
import { userSubscriptionDetailsDto } from '../dtos/userSubscriptionDetailsDto';

export interface LoginState {
  isAuthenticated: boolean;
  user: loginResponseDto | null;
  subscriptionDetails: userSubscriptionDetailsDto | null;
  subscriptionLoading: boolean;
  subscriptionError: string | null;
  error: string | null;
}

export const initialLoginState: LoginState = {
  isAuthenticated: false,
  user: null,
  subscriptionDetails: null,
  subscriptionLoading: false,
  subscriptionError: null,
  error: null
};
