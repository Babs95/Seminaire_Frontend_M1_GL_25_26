import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(c => c.Home)},
  { path: 'projects', loadComponent: () => import('./pages/project-list/project-list').then(c => c.ProjectList)},
  { path: 'projects/:id', loadComponent: () => import('./pages/project-detail/project-detail').then(c => c.ProjectDetail)},
  { path: '**', redirectTo: ''}
];
