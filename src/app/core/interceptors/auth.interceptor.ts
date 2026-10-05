import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";
import { AuthService } from "../auth/auth";
import { inject } from "@angular/core";
import { throwError } from "rxjs";

// Seules les requetes qui modifient une ressource exigent un jeton
export const authInterceptor : HttpInterceptorFn = (req, next) => {
  const isGetApiCall = req.url.startsWith(environment.apiUrl) && req.method !== 'GET';

  if(!isGetApiCall){
    return next(req);
  }

  const auth = inject(AuthService);
  const token = auth.getValidToken();

  if(!token){
    return throwError(() => new HttpErrorResponse({ status: 401, statusText: 'Unauthorized', url: req.url}));
  }

  return next(req.clone({setHeaders: {Authorization: `Bearer ${token}`} }));

};
