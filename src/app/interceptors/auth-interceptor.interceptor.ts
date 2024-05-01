import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SpinnerService } from '../spinner/spinner.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private spinnerService: SpinnerService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //  Get your token
    const Token = this.authService.getToken();

    // Add authorization header with token if available

    if (Token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${Token}`),
      });
    }
    this.spinnerService.requestStarted();
    return this.handler(next, request);
    // return next.handle(request);
  }

  handler(next: HttpHandler, request: HttpRequest<any>) {
    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            this.spinnerService.requestEnded();
          }
        },
        error: (error: HttpErrorResponse) => {
          this.spinnerService.resetSpinner();
          throw error;
        },
      })
    );
  }

}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptorInterceptor,
  multi: true,
};
