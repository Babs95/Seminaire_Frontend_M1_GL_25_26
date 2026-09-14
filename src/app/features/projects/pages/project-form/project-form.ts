import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjetsService } from '../../services/projets';
import { Router } from '@angular/router';
import { Project } from '../../models/project.models';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProjectPreview } from '../../components/project-preview/project-preview';



@Component({
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    ProjectPreview
  ],
  selector: 'app-project-form',
  styleUrl: './project-form.scss',
  templateUrl: './project-form.html',
})
export class ProjectForm {
  private fb = inject(FormBuilder);
  private projetsService = inject(ProjetsService);
  private router = inject(Router);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', {
      validators: [Validators.required, Validators.minLength(3)],
      asyncValidators: [],
      updateOn: 'blur' as const
    }],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    status: ['actif' as Project['status'], [Validators.required]]

  });

  onSubmit() {
    console.log("form:", this.form);
  }
}
