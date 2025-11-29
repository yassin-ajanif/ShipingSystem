import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {provideTranslateService, provideTranslateLoader} from "@ngx-translate/core";
import {provideTranslateHttpLoader} from "@ngx-translate/http-loader";
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { loginReducer } from './pages/authentication-authorization/login/store/login.reducer';
import { LoginEffects } from './pages/authentication-authorization/login/store/login.effects';
import { loadingReducer } from './store/ui/loading.reducer';
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { locationReducer } from './store/location/location.reducer';
import { senderInfoReducer } from './pages/shipment/create/senderInfo/store/sender-info.reducer';
import { LocationEffects } from './store/location/location.effects';
import { createShipmentReducer } from './pages/shipment/create/store/create.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([loadingInterceptor])),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en',
      lang: 'en'
    }),
    // NgRx Store
    provideStore({
      login: loginReducer,
      ui: loadingReducer,
      location: locationReducer,
      senderInfo: senderInfoReducer,
      create: createShipmentReducer
    }),
    provideEffects([LoginEffects, LocationEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false })
  ]
};
