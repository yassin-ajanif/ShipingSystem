import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as LoginActions from './login.actions';
import { AuthService } from '../../Services/auth.service';
import { loginResponseDto } from '../dtos/loginResponseDto';

@Injectable()
export class LoginEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.login),
      switchMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map(response => {
              
              const user = response.data as loginResponseDto;
              
            return LoginActions.loginSuccess({ user });
          }),
          catchError(error => {
            return of(LoginActions.loginFailure({
              error: error.error?.message || error.message || 'Login failed'
            }));
          })
        )
      )
    )
  );

  loadSubscriptionOnLoginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.loginSuccess),
      map(({ user }) => LoginActions.loadUserSubscription({ userId: user.userId }))
    )
  );

  loadUserSubscription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.loadUserSubscription),
      switchMap(({ userId }) =>
        this.authService.getUserSubscription(userId).pipe(
          map(subscription => LoginActions.loadUserSubscriptionSuccess({ subscription })),
          catchError(error =>
            of(
              LoginActions.loadUserSubscriptionFailure({
                error: error?.error?.message ?? error?.message ?? 'Failed to load subscription'
              })
            )
          )
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.logout),
      switchMap(() => {
        // httpOnly cookie will be cleared by the backend on logout
        // Just dispatch success to clear the client-side state
        return of(LoginActions.logoutSuccess());
      })
    )
  );
}
