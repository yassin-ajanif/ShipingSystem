import { Routes } from '@angular/router';

export const returnRoutes: Routes = [
  {
    path: 'items',
    loadComponent: () => import('./returnItems/return-items.component').then(m => m.ReturnItemsComponent)
  },
  {
    path: 'details',
    loadComponent: () => import('./returnDetails/return-details.component').then(m => m.ReturnDetailsComponent)
  },
  {
    path: 'confirmation',
    loadComponent: () => import('./returnConfirmation/return-confirmation.component').then(m => m.ReturnConfirmationComponent)
  },
  {
    path: '',
    redirectTo: 'items',
    pathMatch: 'full'
  }
];
