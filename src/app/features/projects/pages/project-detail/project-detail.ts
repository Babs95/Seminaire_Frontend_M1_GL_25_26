import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../models/project.models';
import { ProjetsService } from '../../services/projets';

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
  protected readonly loading = signal(true);
  protected readonly notFound = signal(false);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.getById(id).subscribe({
      next: project => {
        this.project.set(project);
        this.loading.set(false);
      },
      error: () =>{
        this.notFound.set(true);
        this.loading.set(false);
      }
    });
  }
}
