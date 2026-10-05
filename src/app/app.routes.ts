import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth-guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home').then(c => c.Home)},
  { path: 'login', loadComponent: () => import('./features/auth/pages/login/login').then(c => c.Login)},
  { path: 'projects',
    canActivateChild: [authGuard],
    children: [
      { path: '', loadComponent: () => import('./features/projects/pages/project-list/project-list').then(c => c.ProjectList)},
      { path: 'new', loadComponent: () => import('./features/projects/pages/project-form/project-form').then(c => c.ProjectForm)},
      { path: ':id', loadComponent: () => import('./features/projects/pages/project-detail/project-detail').then(c => c.ProjectDetail)},
    ]

  },

  { path: '**', redirectTo: ''}
];
