import { computed, inject, Injectable, Service, signal } from '@angular/core';
import { Project } from '../models/project.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjetsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/projects`
  private readonly _projects = signal<Project[]>([]);
  private _loading = signal(true);

  //Exposition du signal en lecture seule pour
  readonly projects = this._projects.asReadonly();
  readonly loading = this._loading.asReadonly();

  readonly activeProjectsCount = computed(
    () => this._projects().filter(p => p.status === 'actif').length
  );

  readonly totalTasksCount = computed(
    () => this._projects().reduce((sum, p) => sum + p.tasksCount, 0)
  );

  constructor(){
    this.http.get<Project[]>(this.apiUrl).subscribe({
      next: projects => {
        this._projects.set(projects);
        this._loading.set(false);
      },
      error: () => this._loading.set(false)
    });
  }

  getById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  searchByName(name: string):Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl, {params: {'name_like': name}})
  }

  addProject(input: Omit<Project, 'id' | 'tasksCount'>) : Observable<Project>{
    const project = {...input, tasksCount: 0}
    return this.http.post<Project>(this.apiUrl, project).pipe(
      tap(project => this._projects.update(projects => [...projects, project]))
    );
  }
}
