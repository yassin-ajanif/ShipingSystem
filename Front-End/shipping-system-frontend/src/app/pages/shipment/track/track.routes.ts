import { Routes } from '@angular/router';

export const trackRoutes: Routes = [
  {
    path: 'input',
    loadComponent: () => import('./trackInput/track-input.component').then(m => m.TrackInputComponent)
  },
  {
    path: 'results/:trackingNumber',
    loadComponent: () => import('./trackResults/track-results.component').then(m => m.TrackResultsComponent)
  },
  {
    path: 'not-found',
    loadComponent: () => import('./trackNotFound/track-not-found.component').then(m => m.TrackNotFoundComponent)
  },
  {
    path: '',
    redirectTo: 'input',
    pathMatch: 'full'
  }
];
