import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { ProjetsService } from "../services/projets";
import { delay, map, Observable, of } from "rxjs";

export function uniqueProjectNameValidator(projectService: ProjetsService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const name = (control.value ?? '').trim().toLowerCase();

    if(!name) return of(null);

    return of(name).pipe(
      delay(4000),
      map(value => {
        const exists = projectService.projects().some(p => p.name.trim().toLowerCase() === value);
        return exists ? { nameTaken: true} : null;
      })
    );
  };

}
