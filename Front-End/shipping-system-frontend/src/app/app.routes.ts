import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/authentication-authorization/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/authentication-authorization/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboards/Shipment-/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'shipments/create',
    loadComponent: () => import('./pages/shipment/create/create.component').then(m => m.CreateComponent),
    loadChildren: () => import('./pages/shipment/create/create.routes').then(m => m.createRoutes)
  },
  {
    path: 'shipments/return',
    loadComponent: () => import('./pages/shipment/return/return.component').then(m => m.ReturnComponent),
    loadChildren: () => import('./pages/shipment/return/return.routes').then(m => m.returnRoutes)
  },
  {
    path: 'shipments/track',
    loadComponent: () => import('./pages/shipment/track/track.component').then(m => m.TrackComponent),
    loadChildren: () => import('./pages/shipment/track/track.routes').then(m => m.trackRoutes)
  },
  {
    path: 'rate/calculate',
    loadComponent: () => import('./pages/rate/calculate/calculate.component').then(m => m.CalculateComponent)
  },
  {
    path: 'packages',
    loadComponent: () => import('./pages/packages/packages.component').then(m => m.PackagesComponent),
    loadChildren: () => import('./pages/packages/packages.routes').then(m => m.packagesRoutes)
  }
];
