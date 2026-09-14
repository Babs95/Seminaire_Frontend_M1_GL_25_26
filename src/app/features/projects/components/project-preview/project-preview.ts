import { Component } from '@angular/core';

export interface ProjectDraft {
  name: string;
  description: string;
  statuts: string;
}

@Component({
  imports: [],
  selector: 'app-project-preview',
  styleUrl: './project-preview.scss',
  templateUrl: './project-preview.html',
})
export class ProjectPreview {}
