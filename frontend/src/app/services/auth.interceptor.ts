// auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requiresAuth = req.headers.get('X-Requires-Auth') === 'true';
    console.log(requiresAuth)

    // If header is not set, just forward the request
    if (!requiresAuth) {
      return next.handle(req);
    }

    const token = this.auth.getToken();

    if (!token) {
      this.auth.clearToken();
      this.router.navigate(['/login']);
      return throwError(() => new Error('Authentication token missing'));
    }

    // Clone request to remove our custom header and add the token
    const authReq = req.clone({
      headers: req.headers.delete('X-Requires-Auth').set('Authorization', `Bearer ${token}`)
    });

    console.log(authReq)

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.auth.clearToken();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
