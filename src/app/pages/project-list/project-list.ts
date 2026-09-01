import { Component, signal } from '@angular/core';
import { Project } from '../../shared/models/project.models';

@Component({
  imports: [],
  selector: 'app-project-list',
  styleUrl: './project-list.scss',
  templateUrl: './project-list.html',
})
export class ProjectList {
  protected readonly projects = signal<Project[]>([
    {id: 1, name: "Refonte Facturation", description: 'Migration vers la nouvelle API de paiement', status: 'actif', tasksCount: 13},
    {id: 2, name: "App Mobile RH", description: 'Application de gestion des congés', status: 'en_pause', tasksCount: 5},
    {id: 3, name: "Portail Client", description: 'Espace self-service pour les clients', status: 'termine', tasksCount: 20}
  ]);
}
