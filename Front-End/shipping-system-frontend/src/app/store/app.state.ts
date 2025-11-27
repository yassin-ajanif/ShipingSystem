import { LoginState } from '../pages/authentication-authorization/login/store/login.state';
import { LoadingState } from './ui/loading.state';

export interface AppState {
  login: LoginState;
  ui: LoadingState;
}
