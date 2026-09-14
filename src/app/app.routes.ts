import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home').then(c => c.Home)},
  { path: 'projects', loadComponent: () => import('./features/projects/pages/project-list/project-list').then(c => c.ProjectList)},
  { path: 'projects/new', loadComponent: () => import('./features/projects/pages/project-form/project-form').then(c => c.ProjectForm)},
  { path: 'projects/:id', loadComponent: () => import('./features/projects/pages/project-detail/project-detail').then(c => c.ProjectDetail)},
  { path: '**', redirectTo: ''}
];
