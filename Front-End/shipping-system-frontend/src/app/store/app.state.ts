import { LoginState } from '../pages/authentication-authorization/login/store/login.state';
import { LoadingState } from './ui/loading.state';
import { LocationState } from './location/location.state';
import { CreateState } from '../pages/shipment/create/store/create.state';

export interface AppState {
  login: LoginState;
  ui: LoadingState;
  location: LocationState;
  create: CreateState;
}
