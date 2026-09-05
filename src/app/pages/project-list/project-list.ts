import { Component, inject, signal } from '@angular/core';
import { Project } from '../../shared/models/project.models';
import { Panel } from '../../components/panel/panel';
import { ProjectCard } from '../../components/project-card/project-card';
import { RouterLink } from "@angular/router";
import { ProjetsService } from '../../shared/services/projets';

@Component({
  imports: [ProjectCard, RouterLink],
  selector: 'app-project-list',
  styleUrl: './project-list.scss',
  templateUrl: './project-list.html',
})
export class ProjectList {
  private projectService = inject(ProjetsService);
  protected readonly projects = this.projectService.projects;
  protected readonly activeProjectsCount = this.projectService.activeProjectsCount;

  /**
   * Methode pour récuper l'evenement exposer par le dumb component enfant ProjectCard
   * @param project
   */
  onProjectSelected(project: Project) {
    console.log('Projet selectionné:', project.name)
  }

}
