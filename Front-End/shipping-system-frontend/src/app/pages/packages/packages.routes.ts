import { Routes } from '@angular/router';

export const packagesRoutes: Routes = [
  {
    path: 'pricing',
    loadComponent: () => import('./pricing/pricing.component').then(m => m.PricingComponent)
  },
  {
    path: 'payment',
    loadComponent: () => import('./payment/payment.component').then(m => m.PaymentComponent)
  },
  {
    path: 'confirmation',
    loadComponent: () => import('./confirmation/confirmation.component').then(m => m.ConfirmationComponent)
  },
  {
    path: '',
    redirectTo: 'pricing',
    pathMatch: 'full'
  }
];
