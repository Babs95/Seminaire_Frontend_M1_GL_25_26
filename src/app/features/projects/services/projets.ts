import { computed, Injectable, Service, signal } from '@angular/core';
import { Project } from '../models/project.models';

@Injectable({
  providedIn: 'root'
})
export class ProjetsService {
  private readonly _projects = signal<Project[]>([
    {id: 1, name: "Refonte Facturation", description: 'Migration vers la nouvelle API de paiement', status: 'actif', tasksCount: 13},
    {id: 2, name: "App Mobile RH", description: 'Application de gestion des congés', status: 'en_pause', tasksCount: 5},
    {id: 3, name: "Portail Client", description: 'Espace self-service pour les clients', status: 'termine', tasksCount: 20}
  ]);

  //Exposition du signal en lecture seule pour
  readonly projects = this._projects.asReadonly();

  readonly activeProjectsCount = computed(
    () => this._projects().filter(p => p.status === 'actif').length
  );

  readonly totalTasksCount = computed(
    () => this._projects().reduce((sum, p) => sum + p.tasksCount, 0)
  );

  getById(id: number): Project | undefined {
    return this._projects().find(p => p.id === id);
  }
}
