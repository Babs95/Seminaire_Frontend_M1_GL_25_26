import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Project } from '../../models/project.models';
import { ProjetsService } from '../../services/projets';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, startWith, switchMap } from 'rxjs';

interface DetailState {
  loading: boolean;
  notFound: boolean;
  project: Project | null;
}

const INITIAL_STATE: DetailState = {
  loading: true,
  notFound: false,
  project: null
};

@Component({
  imports: [
    RouterLink,
  ],
  selector: 'app-project-detail',
  styleUrl: './project-detail.scss',
  templateUrl: './project-detail.html',
})
export class ProjectDetail {
  private projectService = inject(ProjetsService);
  private route = inject(ActivatedRoute);

  // paramMap est un Observable qui réémet à chaque changement de paramètre dans l'URL. Ici, on transforme cet Observable en signal pour pouvoir l'utiliser facilement dans le template.
  private readonly id = toSignal(this.route.paramMap.pipe(
    map(p => Number(p.get('id')!))), { requireSync: true});


  // switchMap annule automatiquement la requête précédente si l'id change, ce qui est utile si l'utilisateur navigue rapidement entre plusieurs projets.
  private readonly state = toSignal(
    toObservable(this.id).pipe(
      switchMap(id => {
        return this.projectService.getById(id).pipe(
          map((project): DetailState => ({ loading: false, notFound: false, project })),
          catchError(() => of<DetailState>({ loading: false, notFound: true, project: null })),
          startWith({ loading: true, notFound: false, project: null })
        );
      })
    ),
    { initialValue: INITIAL_STATE }
  );

  protected readonly project = computed(() => this.state().project);
  protected readonly loading = computed(() => this.state().loading);
  protected readonly notFound = computed(() => this.state().notFound);

  protected readonly currentIndex = computed(() =>  {
    const current = this.project();
    if(!current) return -1;
    return this.projectService.projects().findIndex(p => p.id === current.id)
  }
  );

  protected readonly previousProject = computed(() =>  {
    const index = this.currentIndex();
    if(index<= 0) return null;
    return this.projectService.projects()[index - 1];
  }
  );

  protected readonly nextProject = computed(() =>  {
    const index = this.currentIndex();
    if(index< 0 || index >= this.projectService.projects().length - 1) return null;
    return this.projectService.projects()[index + 1];
  }
  );

  constructor() {

    effect(() => {
      console.log('Hello ProjectDetail');
      console.log('ProjectDetail id signal:', this.id());
      const project = this.project();
      document.title = project ? `TaskFlow - ${project.name}` : 'TaskFlow';
    });
  }

}
