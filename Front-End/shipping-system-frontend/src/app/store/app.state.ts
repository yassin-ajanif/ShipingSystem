import { LoginState } from '../pages/authentication-authorization/login/store/login.state';
import { LoadingState } from './ui/loading.state';
import { LocationState } from './location/location.state';
import { SenderInfoState } from '../pages/shipment/create/senderInfo/store/sender-info.state';
import { CreateState } from '../pages/shipment/create/store/create.state';

export interface AppState {
  login: LoginState;
  ui: LoadingState;
  location: LocationState;
  senderInfo: SenderInfoState;
  create: CreateState;
}
