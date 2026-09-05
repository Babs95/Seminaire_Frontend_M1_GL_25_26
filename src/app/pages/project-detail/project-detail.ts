import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../shared/models/project.models';
import { ProjetsService } from '../../shared/services/projets';

@Component({
  imports: [],
  selector: 'app-project-detail',
  styleUrl: './project-detail.scss',
  templateUrl: './project-detail.html',
})
export class ProjectDetail implements OnInit {
  private projectService = inject(ProjetsService);
  private route = inject(ActivatedRoute);
  protected readonly project = signal<Project | null>(null);
  protected readonly notFound = signal(false);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.projectService.getById(id);
    if(found){
      this.project.set(found);
    }else{
      this.notFound.set(true);
    }
  }
}
