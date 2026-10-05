import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectDetail } from './project-detail';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';

describe('ProjectDetail', () => {
  let component: ProjectDetail;
  let fixture: ComponentFixture<ProjectDetail>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetail],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {paramMap: of(convertToParamMap({ id: '1' }))} // Simule un paramètre de route avec l'ID du projet
        }
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ProjectDetail);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Déclenche la détection des changements pour initialiser le composant
    httpMock.expectOne(`${environment.apiUrl}/projects`).flush([]);
  });

  afterEach(() => {
    httpMock.verify(); // Vérifie qu'il n'y a pas de requêtes HTTP en attente
  });

  it('should create', () => {
    fixture.detectChanges();
    httpMock.expectOne(`${environment.apiUrl}/projects/1`).flush(
      {
      "id": 1,
      "name": "Refonte Facturation",
      "description": "Migration vers la nouvelle API de paiement",
      "status": "actif",
      "tasksCount": 13
    }); // Simule la réponse de l'API
    expect(component).toBeTruthy();
  });

  it('affiche un message quand le projet n\'existe pas', () => {
    fixture.detectChanges();
    httpMock.expectOne(`${environment.apiUrl}/projects/1`).flush(
      {message: "Not Found"},
      {status: 404, statusText: 'Not Found'}
    ); // Simule la réponse de l'API
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Ce projet n\'existe pas');
  });
});
