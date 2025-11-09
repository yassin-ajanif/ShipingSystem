import { Routes } from '@angular/router';

export const createRoutes: Routes = [
  {
    path: '',
    redirectTo: 'senderInfo',
    pathMatch: 'full'
  },
  {
    path: 'senderInfo',
    loadComponent: () => import('./senderInfo/sender-info.component').then(m => m.SenderInfoComponent)
  },
  {
    path: 'recipientInfo',
    loadComponent: () => import('./recipientInfo/recipient-info.component').then(m => m.RecipientInfoComponent)
  },
  {
    path: 'packageDetails',
    loadComponent: () => import('./packageDetails/package-details.component').then(m => m.PackageDetailsComponent)
  },
  {
    path: 'paymentMethod',
    loadComponent: () => import('./paymentMethod/payment-method.component').then(m => m.PaymentMethodComponent)
  },
  {
    path: 'confirmation',
    loadComponent: () => import('./lastFeedback/last-feedback.component').then(m => m.LastFeedbackComponent)
  }
];
