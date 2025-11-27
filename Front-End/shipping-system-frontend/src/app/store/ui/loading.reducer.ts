import { createReducer, on } from '@ngrx/store';
import { beginLoading, endLoading } from './loading.actions';
import { LoadingState, initialLoadingState } from './loading.state';

export const loadingReducer = createReducer(
  initialLoadingState,
  on(beginLoading, (): LoadingState => ({
    isLoading: true
  })),
  on(endLoading, (): LoadingState => ({
    isLoading: false
  }))
);
