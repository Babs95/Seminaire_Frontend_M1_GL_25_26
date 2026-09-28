import { Component, inject, signal } from '@angular/core';
import { ProjectCard } from '../../components/project-card/project-card';
import { RouterLink } from "@angular/router";
import { Project } from '../../models/project.models';
import { ProjetsService } from '../../services/projets';
import { APP_CONFIG, defaultAppConfig } from '../../../../core/config/app-config.token';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [ProjectCard, RouterLink, MatButtonModule],
  selector: 'app-project-list',
  styleUrl: './project-list.scss',
  templateUrl: './project-list.html',
  // Scoping : Cette page recoit sa PROPRE instance de APP_CONFIG,
  // avec une pagination plus large que la config globale sans toucher
  // à ce que voient les autres composants (ex: Header)
  providers: [
    { provide: APP_CONFIG, useValue: { ...defaultAppConfig, defaultPageSize: 25} }
  ]
})
export class ProjectList {
  private projectService = inject(ProjetsService);
  private config = inject(APP_CONFIG);
  protected readonly projects = this.projectService.projects;
  protected readonly loading = this.projectService.loading;
  protected readonly activeProjectsCount = this.projectService.activeProjectsCount;
  protected readonly pageSize = this.config.defaultPageSize;

  /**
   * Methode pour récuper l'evenement exposer par le dumb component enfant ProjectCard
   * @param project
   */
  onProjectSelected(project: Project) {
    console.log('Projet selectionné:', project.name)
  }

}
