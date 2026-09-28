import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error(`Erreur HTTP ${error.status} sur ${req.method} ${req.url}`, error);
      return throwError(() => error)
    })
  );
};
