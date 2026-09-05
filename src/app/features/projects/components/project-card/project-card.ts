import { Component, input, output } from '@angular/core';
import { Project } from '../../models/project.models';

@Component({
  imports: [],
  selector: 'app-project-card',
  styleUrl: './project-card.scss',
  templateUrl: './project-card.html',
})
export class ProjectCard {
  /**
   * Un dumb component recoit des données via input()
   * et signale des événements vers l'extérieur via output()
   */
  project = input.required<Project>();
  selected = output<Project>();

  onSelect(){
    console.log('ProjectCard selected card', this.project().name)
    this.selected.emit(this.project());
  }
}
