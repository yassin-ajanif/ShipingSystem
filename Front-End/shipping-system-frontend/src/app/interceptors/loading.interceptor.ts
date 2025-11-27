import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { beginLoading, endLoading } from '../store/ui/loading.actions';
import { finalize } from 'rxjs/operators';
import { AppState } from '../store/app.state';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store<AppState>);
  store.dispatch(beginLoading());

  return next(req).pipe(
    finalize(() => store.dispatch(endLoading()))
  );
};
